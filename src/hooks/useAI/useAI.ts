import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { useState, useCallback } from "react";

export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);

  const improve = useCallback(
    async (
      prompt: keyof typeof AI_PROMPTS,
      text: string,
    ): Promise<string | null> => {
      if (!apiKey || !text) return null;
      setIsLoading(true);
      try {
        return await improveText(apiKey, AI_PROMPTS[prompt], text);
      } catch {
        // TODO: show error toast
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey],
  );

  return { improve, isLoading };
};
