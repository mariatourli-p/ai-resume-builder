import type { BrowserAIStatus } from "@/services";
import { createContext } from "react";

export type AISettingsContextType = {
  /** `null` while the check is still running */
  browserAvailability: BrowserAIStatus | null;
  /** Built-in model download progress (`0`–`1`), `null` when not downloading */
  browserDownloadProgress: number | null;
  /** The last download started from Settings failed (disk space, connection) */
  browserDownloadFailed: boolean;
  /** Starts the one-time built-in model download. Call from a user action. */
  startBrowserAIDownload: () => void;
  /** Whether this browser can run the built-in AI */
  isReady: boolean;
  /**
   * Why the AI can't run, as an error code for the AI error dialog:
   * another browser (`unsupported`) or this computer (`unsupported_device`).
   * `null` when it can run.
   */
  unsupportedReason: "unsupported" | "unsupported_device" | null;
};

export const AISettingsContext = createContext<
  AISettingsContextType | undefined
>(undefined);
