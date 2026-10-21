import { useContext } from "react";
import { AISettingsContext } from "./AISettingsContext";

export const useAISettings = () => {
  const ctx = useContext(AISettingsContext);
  if (!ctx)
    throw new Error("useAISettings must be used inside AISettingsProvider");
  return ctx;
};
