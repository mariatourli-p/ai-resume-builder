import type { BrowserAIStatus } from "@/services";
import { createContext } from "react";

/**
 * Where the user lets the AI run: `"cloud"` sends the text to Google's
 * Gemini first (Chrome's built-in AI takes over when it's busy), `"device"`
 * uses only Chrome's built-in AI, on the user's computer.
 */
export type CloudConsent = "cloud" | "device";

export type AISettingsContextType = {
  /** The user's choice, saved in this browser. `null` until they choose. */
  cloudConsent: CloudConsent | null;
  /**
   * Opens the consent dialog and resolves with the user's choice, or `null`
   * if they close it without choosing. Call from an AI button.
   */
  requestCloudConsent: () => Promise<CloudConsent | null>;
  /** Whether the consent dialog is open */
  isConsentDialogOpen: boolean;
  /**
   * Saves a choice from the consent dialog or Settings and closes the
   * dialog. `null` closes it without saving.
   */
  answerCloudConsent: (choice: CloudConsent | null) => void;
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
