import { createContext } from "react";

export type ApiKeyContextType = {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
};

export const ApiKeyContext = createContext<ApiKeyContextType | undefined>(
  undefined,
);
