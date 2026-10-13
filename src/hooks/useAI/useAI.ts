import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { AIProviderError, askAI } from "@/services";
import { enTokens } from "@/locale/en/en-tokens";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { validateAchievementsResult } from "@/utils/validateAchievementsResult";
import { validateAIResult } from "@/utils/validateAIResult";
import { resolveJobTitle } from "@/utils/resolveJobTitle";
import { checkVolunteerWork } from "@/utils/checkVolunteerWork";
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
   * When set, the AI first checks that these volunteering details (role and
   * organization) say what the work was about, and only writes the
   * text if they do.
   */
  volunteerWork?: string;
};

/**
 * What the AI should work on. With `jobTitle`, pass a function to build it
 * from the profession the AI found instead of the user's raw keyword.
 */
export type ImproveInput = string | ((jobTitle: string) => string);

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

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (
      promptKey: keyof typeof AI_PROMPTS | string,
      input: ImproveInput,
      validatorType: ValidatorType,
      { onPartial, jobTitle, volunteerWork }: ImproveOptions = {},
    ): Promise<string | null> => {
      if (!input) return null;

      const prompt =
        AI_PROMPTS[promptKey as keyof typeof AI_PROMPTS] ?? promptKey;

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
          const isVolunteerWork = await timer.time(
            "check volunteer work",
            checkVolunteerWork(volunteerWork),
          );
          if (!isVolunteerWork) {
            dispatch(
              toggleDialog({
                type: "moreContext",
                message: enTokens.moreContextDialog.invalidVolunteerWork,
              }),
            );
            return null;
          }
        }

        const result = await timer.time(
          "write text",
          askAI({
            prompt,
            text: typeof input === "function" ? input(profession) : input,
            onChunk: onPartial,
          }),
        );

        let validator: Promise<boolean>;

        switch (validatorType) {
          case "skills":
            validator = Promise.resolve(true);
            break;
          case "achievements":
            validator = validateAchievementsResult(result);
            break;
          case "summary":
          default:
            validator = validateAIResult(result);
            break;
        }

        const isValid = await timer.time("check result", validator);

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
        timer.log(String(promptKey));
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return { improve, isLoading };
};
