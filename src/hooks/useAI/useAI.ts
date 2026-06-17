import { toggleDialog } from "@/redux/resume/resume-reducer";
import { useAppDispatch } from "@/redux/store";
import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import { useCallback, useState } from "react";

export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const improve = useCallback(
    async (prompt: string, text: string): Promise<string | null> => {
      if (!apiKey || !text) return null;
      setIsLoading(true);
      try {
        return await improveText(apiKey, prompt, text);
      } catch {
        // TODO
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
