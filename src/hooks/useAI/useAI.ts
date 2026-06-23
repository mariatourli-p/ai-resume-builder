import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";
import { useCallback, useState } from "react";

export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (
      promptKey: keyof typeof AI_PROMPTS | string,
      text: string,
    ): Promise<string | null> => {
      if (!apiKey || !text) return null;

      const prompt =
        AI_PROMPTS[promptKey as keyof typeof AI_PROMPTS] ?? promptKey;

      setIsLoading(true);
      try {
        const result = await improveText({ apiKey, prompt, text });

        const bullets = result
          .split("\n")
          .filter((line) => line.trim().startsWith("BULLET::"))
          .map((line) => "• " + line.replace("BULLET::", "").trim())
          .join("\n");

        if (!bullets) {
          dispatch(toggleDialog("moreContext"));
          return null;
        }

        return bullets;
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
