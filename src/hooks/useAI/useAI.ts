import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { validateAchievementsResult } from "@/utils/validateAchievementsResult";
import { validateAIResult } from "@/utils/validateAIResult";
import { useCallback, useState } from "react";

export type ValidatorType = "summary" | "achievements";

export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (
      promptKey: keyof typeof AI_PROMPTS | string,
      text: string,
      validatorType: ValidatorType,
    ): Promise<string | null> => {
      if (!apiKey || !text) return null;

      const prompt =
        AI_PROMPTS[promptKey as keyof typeof AI_PROMPTS] ?? promptKey;

      setIsLoading(true);
      try {
        const result = await improveText({ apiKey, prompt, text });

        let validator: Promise<boolean>;

        switch (validatorType) {
          case "achievements":
            validator = validateAchievementsResult(apiKey, result);
            break;
          case "summary":
          default:
            validator = validateAIResult(apiKey, result);
            break;
        }

        const isValid = await validator;

        if (!isValid) {
          dispatch(toggleDialog({ type: "moreContext", message: result }));
          return null;
        }

        return result;
      } catch (error) {
        dispatch(
          toggleDialog({
            type: "keyError",
            message:
              error instanceof Error
                ? error.message
                : "Something went wrong with your API key. Please check and try again.",
          }),
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, dispatch],
  );

  return { improve, isLoading };
};
