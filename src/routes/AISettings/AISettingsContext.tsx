import type { BrowserAIAvailability } from "@/services";
import { createContext } from "react";

export type AISettingsContextType = {
  /** `null` while the check is still running */
  browserAvailability: BrowserAIAvailability | null;
  /** Built-in model download progress (`0`–`1`), `null` when not downloading */
  browserDownloadProgress: number | null;
  /** Starts the one-time built-in model download. Call from a user action. */
  startBrowserAIDownload: () => void;
  /** Whether this browser can run the built-in AI */
  isReady: boolean;
};

export const AISettingsContext = createContext<
  AISettingsContextType | undefined
>(undefined);
