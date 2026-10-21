import {
  getBrowserAIAvailability,
  onBrowserAIDownloadProgress,
  prepareBrowserAI,
  type BrowserAIStatus,
} from "@/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AISettingsContext,
  type AISettingsContextType,
} from "./AISettingsContext";

/** Provider choice, API keys and online AI choice saved by earlier versions */
const OBSOLETE_STORAGE_KEYS = [
  "resume_ai_provider",
  "resume_ai_api_keys",
  "resume_api_key",
  "resume_ai_cloud_consent",
];

export const AISettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [browserAvailability, setBrowserAvailability] =
    useState<BrowserAIStatus | null>(null);
  const [browserDownloadProgress, setBrowserDownloadProgress] = useState<
    number | null
  >(null);
  const [browserDownloadFailed, setBrowserDownloadFailed] = useState(false);

  // The app no longer uses API keys - don't leave them in the browser
  useEffect(() => {
    OBSOLETE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);

  const refreshBrowserAvailability = useCallback(() => {
    getBrowserAIAvailability().then(setBrowserAvailability);
  }, []);

  useEffect(refreshBrowserAvailability, [refreshBrowserAvailability]);

  /**
   * Progress comes from any session created while the model downloads -
   * the explicit download below or the first AI request.
   */
  useEffect(
    () =>
      onBrowserAIDownloadProgress((progress) => {
        if (progress >= 1) {
          setBrowserDownloadProgress(null);
          refreshBrowserAvailability();
        } else {
          setBrowserDownloadProgress(progress);
        }
      }),
    [refreshBrowserAvailability],
  );

  /**
   * Starts the model download. When: the user clicks the download button in
   * Settings. A failure is kept, so Settings and the header can tell the user
   * to check the disk space and connection instead of failing silently.
   */
  const startBrowserAIDownload = useCallback(() => {
    setBrowserDownloadProgress(0);
    setBrowserDownloadFailed(false);
    prepareBrowserAI()
      .catch(() => setBrowserDownloadFailed(true))
      .finally(() => {
        setBrowserDownloadProgress(null);
        refreshBrowserAvailability();
      });
  }, [refreshBrowserAvailability]);

  /**
   * Why the AI can't run: another browser, or a Chrome on a computer that
   * doesn't meet the model's requirements. While the check is still running
   * (`null`), let the request go through: the browser provider reports the
   * reason itself if needed.
   */
  const unsupportedReason: AISettingsContextType["unsupportedReason"] =
    browserAvailability === "unsupported_browser"
      ? "unsupported"
      : browserAvailability === "unavailable"
        ? "unsupported_device"
        : null;
  const isReady = unsupportedReason === null;

  const value = useMemo(
    () => ({
      browserAvailability,
      browserDownloadProgress,
      browserDownloadFailed,
      startBrowserAIDownload,
      isReady,
      unsupportedReason,
    }),
    [
      browserAvailability,
      browserDownloadProgress,
      browserDownloadFailed,
      startBrowserAIDownload,
      isReady,
      unsupportedReason,
    ],
  );

  return (
    <AISettingsContext.Provider value={value}>
      {children}
    </AISettingsContext.Provider>
  );
};
