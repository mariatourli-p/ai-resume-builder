import type { AIStatusPanelProps } from "@/components/Settings/AIStatusPanel";
import { enTokens } from "@/locale/en/en-tokens";
import { useMemo } from "react";
import { useAISettings } from "./useAISettings";

const t = enTokens.aiAssistant;

/** "Downloading the AI model (one time)… 45%" */
export const formatDownloadProgress = (progress: number): string =>
  t.downloading.replace("{percent}", String(Math.round(progress * 100)));

/**
 * Connects {@link AIStatusPanel} to the built-in AI state: whether it's
 * supported, downloading, or ready.
 */
export const useAIStatusPanel = (): AIStatusPanelProps => {
  const {
    browserAvailability,
    browserDownloadProgress,
    browserDownloadFailed,
    startBrowserAIDownload,
  } = useAISettings();

  return useMemo(() => {
    const base = { label: t.label, description: t.description };

    if (browserDownloadProgress !== null) {
      return {
        ...base,
        note: formatDownloadProgress(browserDownloadProgress),
        progress: browserDownloadProgress,
      };
    }

    const status = browserAvailability ?? "checking";
    // Chrome still says "downloadable" after a failed download
    if (browserDownloadFailed && status === "downloadable") {
      return {
        ...base,
        note: t.downloadFailed,
        noteSeverity: "warning" as const,
        action: { label: t.retryDownload, onClick: startBrowserAIDownload },
      };
    }

    return {
      ...base,
      note: status === "downloading" ? t.downloadingBackground : t[status],
      noteSeverity:
        status === "unavailable" || status === "unsupported_browser"
          ? "warning"
          : "info",
      action:
        status === "downloadable"
          ? { label: t.downloadButton, onClick: startBrowserAIDownload }
          : undefined,
    };
  }, [
    browserAvailability,
    browserDownloadProgress,
    browserDownloadFailed,
    startBrowserAIDownload,
  ]);
};
