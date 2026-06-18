import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import type { AI_PROMPTS } from "@/services/aiPrompts";
import { useCallback, useState } from "react";

/**
 * Hook that exposes AI text improvement functionality.
 *
 * Reads the API key from context and manages loading state.
 * On auth failure, opens the key error dialog automatically.
 *
 * @returns
 * - `improve` — async function that takes a prompt key and input text,
 *   resolves the prompt from {@link AI_PROMPTS}, and returns the improved string or null.
 * - `isLoading` — true while a request is in flight.
 */
export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (
      prompt: keyof typeof AI_PROMPTS | string,
      text: string,
    ): Promise<string | null> => {
      if (!apiKey || !text) return null;
      setIsLoading(true);
      try {
        const result = await improveText({ apiKey, prompt, text });

        // Ask Claude to classify its own output
        const classification = await improveText({
          apiKey,
          prompt: `You are a classifier. Determine if the following text is:
A) A finished, rewritten resume bullet point ready to use
B) A question, request for clarification, or asks the user to provide more information

Respond with ONLY the single character "A" or "B". Nothing else.`,
          text: result,
        });

        if (classification.trim() !== "A") {
          dispatch(toggleDialog("moreContext"));
          return null;
        }
        return result;
      } catch {
        dispatch(toggleDialog("keyError"));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, dispatch],
  );

  return { improve, isLoading };
};
