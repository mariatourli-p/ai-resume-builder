import { enTokens } from "@/locale/en/en-tokens";
import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { AIProviderError, askAI } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { findVolunteerArea } from "@/utils/findVolunteerArea";
import { resolveJobTitle } from "@/utils/resolveJobTitle";
import { validateAchievementsResult } from "@/utils/validateAchievementsResult";
import { validateAIResult } from "@/utils/validateAIResult";
import { useCallback, useState } from "react";

/** How the result is checked; `"skills"` is parsed and checked by the caller */
export type ValidatorType = "summary" | "achievements" | "skills";

/** `We couldn't link "lalala" to a profession. ...` */
const formatInvalidTitle = (title: string) =>
  enTokens.moreContextDialog.invalidTitle.replace("{title}", title.trim());

export type ImproveOptions = {
  /** Receives the text so far while the AI is still writing */
  onPartial?: (textSoFar: string) => void;
  /**
   * When set, the AI first finds the profession this title or keyword points
   * to (e.g. a technology → its developer), and only writes the text if
   * there is one.
   */
  jobTitle?: string;
  /**
   * When set, the AI first finds the area of these volunteering details
   * (role and organization), e.g. "Health and safety", and only writes the
   * text if there is one. The area is passed to `input` like a profession.
   */
  volunteerWork?: string;
};

/**
 * What the AI should work on. With `jobTitle` or `volunteerWork`, pass a
 * function to build it from the profession or area the AI found instead of
 * the user's raw keyword.
 */
export type ImproveInput = string | ((profession: string) => string);

/**
 * Measures how long each AI step takes. In development the steps are logged
 * to the console (F12), to spot which part of a request is slow.
 */
const createStepTimer = () => {
  const steps: Record<string, number> = {};
  const start = performance.now();
  return {
    time: async <T>(step: string, work: Promise<T>): Promise<T> => {
      const stepStart = performance.now();
      try {
        return await work;
      } finally {
        steps[step] = Math.round(performance.now() - stepStart);
      }
    },
    log: (label: string) => {
      if (!import.meta.env.DEV) return;
      const total = Math.round(performance.now() - start);
      console.info(`[AI] ${label}: ${total}ms`, steps);
    },
  };
};

/**
 * Runs AI text requests for the form views.
 *
 * @returns `improve`, which writes a text with the prompt `promptKey` and
 * returns it, or `null` after showing a dialog (rejected title or area,
 * failed check, or AI error); and `isLoading` while a request runs.
 *
 * @example
 * const { improve } = useAI();
 * const bio = await improve(
 *   "smartRewrite",
 *   (profession) => `Job title: ${profession}`,
 *   "summary",
 *   { jobTitle: "React", onPartial: updateSummary },
 * );
 */
export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (
      promptKey: keyof typeof AI_PROMPTS,
      input: ImproveInput,
      validatorType: ValidatorType,
      { onPartial, jobTitle, volunteerWork }: ImproveOptions = {},
    ): Promise<string | null> => {
      if (!input) return null;

      const prompt = AI_PROMPTS[promptKey];
      const timer = createStepTimer();
      setIsLoading(true);
      try {
        let profession = "";

        if (jobTitle) {
          const resolved = await timer.time(
            "find profession",
            resolveJobTitle(jobTitle),
          );

          if (!resolved) {
            dispatch(
              toggleDialog({
                type: "moreContext",
                message: formatInvalidTitle(jobTitle),
              }),
            );
            return null;
          }
          profession = resolved;
        }

        if (volunteerWork !== undefined) {
          const area = await timer.time(
            "find volunteer area",
            findVolunteerArea(volunteerWork),
          );

          if (!area) {
            dispatch(
              toggleDialog({
                type: "moreContext",
                message: enTokens.moreContextDialog.invalidVolunteerWork,
              }),
            );
            return null;
          }
          // Passed to `input` like a profession, so the text is built from it
          profession = area;
        }

        const result = await timer.time(
          "write text",
          askAI({
            prompt,
            text: typeof input === "function" ? input(profession) : input,
            onChunk: onPartial,
          }),
        );

        // Skills are parsed and checked by the caller, without another AI call
        const isValid =
          validatorType === "skills" ||
          (await timer.time(
            "check result",
            validatorType === "achievements"
              ? validateAchievementsResult(result)
              : validateAIResult(result),
          ));

        if (!isValid) {
          dispatch(toggleDialog({ type: "moreContext", message: result }));
          return null;
        }

        return result;
      } catch (error) {
        const code =
          error instanceof AIProviderError ? error.code : "request_failed";
        dispatch(toggleDialog({ type: "aiError", message: code }));
        return null;
      } finally {
        timer.log(promptKey);
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return { improve, isLoading };
};
