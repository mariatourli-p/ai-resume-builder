import {
  allowCloudAI,
  getBrowserAIAvailability,
  onBrowserAIDownloadProgress,
  prepareBrowserAI,
  type BrowserAIStatus,
} from "@/services";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AISettingsContext,
  type AISettingsContextType,
  type CloudConsent,
} from "./AISettingsContext";

/** Provider choice and API keys saved by earlier versions of the app */
const OBSOLETE_STORAGE_KEYS = [
  "resume_ai_provider",
  "resume_ai_api_keys",
  "resume_api_key",
];

/** Where the user's consent choice is saved in this browser */
const CONSENT_STORAGE_KEY = "resume_ai_cloud_consent";

/** The saved choice; `null` if none, or if the browser blocks storage */
const readSavedConsent = (): CloudConsent | null => {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    return saved === "cloud" || saved === "device" ? saved : null;
  } catch {
    return null;
  }
};

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
  const [cloudConsent, setCloudConsent] = useState(readSavedConsent);
  const [isConsentDialogOpen, setIsConsentDialogOpen] = useState(false);
  // Resolves the promise of the AI click that opened the consent dialog
  const resolveConsentRef = useRef<
    ((choice: CloudConsent | null) => void) | null
  >(null);

  // The app no longer uses API keys - don't leave them in the browser
  useEffect(() => {
    OBSOLETE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  }, []);

  // The AI service sends text online only while the user allows it
  useEffect(() => {
    allowCloudAI(cloudConsent === "cloud");
  }, [cloudConsent]);

  /**
   * Opens the consent dialog. When: an AI button is clicked before the user
   * has chosen. The click waits for the answer, so it can go on right away
   * instead of asking the user to click again.
   */
  const requestCloudConsent = useCallback(
    () =>
      new Promise<CloudConsent | null>((resolve) => {
        resolveConsentRef.current?.(null);
        resolveConsentRef.current = resolve;
        setIsConsentDialogOpen(true);
      }),
    [],
  );

  /**
   * Saves the user's choice and closes the dialog. When: a button in the
   * consent dialog, or the switch in Settings. `null` (the dialog closed
   * without a choice) saves nothing, so the dialog asks again next time.
   */
  const answerCloudConsent = useCallback((choice: CloudConsent | null) => {
    if (choice) {
      // Right away, not in the effect: the waiting AI click goes on now
      allowCloudAI(choice === "cloud");
      setCloudConsent(choice);
      try {
        localStorage.setItem(CONSENT_STORAGE_KEY, choice);
      } catch {
        // Storage blocked: the choice still holds until the page reloads
      }
    }
    setIsConsentDialogOpen(false);
    resolveConsentRef.current?.(choice);
    resolveConsentRef.current = null;
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
      cloudConsent,
      requestCloudConsent,
      isConsentDialogOpen,
      answerCloudConsent,
      browserAvailability,
      browserDownloadProgress,
      browserDownloadFailed,
      startBrowserAIDownload,
      isReady,
      unsupportedReason,
    }),
    [
      cloudConsent,
      requestCloudConsent,
      isConsentDialogOpen,
      answerCloudConsent,
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
