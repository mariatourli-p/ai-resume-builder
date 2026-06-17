import { useApiKey } from "@/routes/ApiKey/useApiKey";
import { improveText } from "@/services";
import { useCallback, useState } from "react";

export const useAI = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  console.log("🚀 1111", isLoading);

  const improve = useCallback(
    async (prompt: string, text: string): Promise<string | null> => {
      console.log("🚀 222", prompt, text);  
      if (!apiKey || !text) return null;
      setIsLoading(true);
      try {
        return await improveText(apiKey, prompt, text);
      } catch {
        // TODO
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey],
  );

  return { improve, isLoading };
};
