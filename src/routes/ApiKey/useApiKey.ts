import { useContext } from "react";
import { ApiKeyContext } from "./ApiKeyContext";

export const useApiKey = () => {
  const ctx = useContext(ApiKeyContext);
  if (!ctx) throw new Error("useApiKey must be used inside ApiKeyProvider");
  return ctx;
};
