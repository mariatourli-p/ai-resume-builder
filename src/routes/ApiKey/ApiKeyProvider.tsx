import { useState } from "react";
import { ApiKeyContext } from "./ApiKeyContext";

const API_KEY_STORAGE_KEY = "resume_api_key";

export const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKeyState] = useState<string>(
    () =>
      localStorage.getItem(API_KEY_STORAGE_KEY) ??
      import.meta.env.VITE_ANTHROPIC_API_KEY ??
      "",
  );

  const setApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKeyState("");
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
