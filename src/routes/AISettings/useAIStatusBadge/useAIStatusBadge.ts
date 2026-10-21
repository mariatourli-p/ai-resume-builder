import type { AIStatusBadgeProps } from "@/components/Feedback/AIStatusBadge";
import { enTokens } from "@/locale/en";
import { useMemo } from "react";
import { formatDownloadProgress } from "../useAIStatusPanel";
import { useAISettings } from "../AISettingsProvider";

const t = enTokens.aiAssistant;

/**
 * Connects {@link AIStatusBadge} to the built-in AI state, so the header
 * always shows whether the AI can run here and, on hover, why not.
 */
export const useAIStatusBadge = (): AIStatusBadgeProps => {
  const {
    browserAvailability,
    browserDownloadProgress,
    browserDownloadFailed,
  } = useAISettings();

  return useMemo((): AIStatusBadgeProps => {
    if (browserDownloadProgress !== null) {
      return {
        label: t.badge.downloadingPercent.replace(
          "{percent}",
          String(Math.round(browserDownloadProgress * 100)),
        ),
        tooltip: formatDownloadProgress(browserDownloadProgress),
        tone: "info",
      };
    }
    // Chrome still says "downloadable" after a failed download
    if (browserDownloadFailed && browserAvailability === "downloadable") {
      return {
        label: t.badge.downloadFailed,
        tooltip: t.downloadFailed,
        tone: "error",
      };
    }

    switch (browserAvailability) {
      case null:
        return {
          label: t.badge.checking,
          tooltip: t.checking,
          tone: "neutral",
        };
      case "available":
        return {
          label: t.badge.available,
          tooltip: t.available,
          tone: "success",
        };
      case "downloadable":
        return {
          label: t.badge.downloadable,
          tooltip: t.downloadable,
          tone: "info",
        };
      case "downloading":
        return {
          label: t.badge.downloading,
          tooltip: t.downloadingBackground,
          tone: "info",
        };
      case "unavailable":
        return {
          label: t.badge.unsupported,
          tooltip: t.unavailable,
          tone: "warning",
        };
      case "unsupported_browser":
      default:
        return {
          label: t.badge.unsupported,
          tooltip: t.unsupported_browser,
          tone: "warning",
        };
    }
  }, [browserAvailability, browserDownloadProgress, browserDownloadFailed]);
};
