import {
  getBrowserAIAvailability,
  onBrowserAIDownloadProgress,
  prepareBrowserAI,
  type BrowserAIAvailability,
} from "@/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AISettingsContext } from "./AISettingsContext";

/** Provider choice and API keys saved by earlier versions of the app */
const OBSOLETE_STORAGE_KEYS = [
  "resume_ai_provider",
  "resume_ai_api_keys",
  "resume_api_key",
];

export const AISettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [browserAvailability, setBrowserAvailability] =
    useState<BrowserAIAvailability | null>(null);
  const [browserDownloadProgress, setBrowserDownloadProgress] = useState<
    number | null
  >(null);

  // The app no longer uses API keys - don't leave them in the browser
  useEffect(() => {
    OBSOLETE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);

  const refreshBrowserAvailability = useCallback(() => {
    getBrowserAIAvailability().then(setBrowserAvailability);
  }, []);

  useEffect(refreshBrowserAvailability, [refreshBrowserAvailability]);

  // Progress comes from any session created while the model downloads -
  // the explicit download below or the first AI request.
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

  const startBrowserAIDownload = useCallback(() => {
    setBrowserDownloadProgress(0);
    prepareBrowserAI()
      .catch(() => undefined)
      .finally(() => {
        setBrowserDownloadProgress(null);
        refreshBrowserAvailability();
      });
  }, [refreshBrowserAvailability]);

  // While the check is still running, let the request go through:
  // the browser provider reports "unsupported" itself if needed.
  const isReady = browserAvailability !== "unavailable";

  const value = useMemo(
    () => ({
      browserAvailability,
      browserDownloadProgress,
      startBrowserAIDownload,
      isReady,
    }),
    [
      browserAvailability,
      browserDownloadProgress,
      startBrowserAIDownload,
      isReady,
    ],
  );

  return (
    <AISettingsContext.Provider value={value}>
      {children}
    </AISettingsContext.Provider>
  );
};
