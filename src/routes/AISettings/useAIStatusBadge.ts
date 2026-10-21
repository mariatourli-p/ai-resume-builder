import type { AIStatusBadgeProps } from "@/components/Feedback/AIStatusBadge";
import { enTokens } from "@/locale/en/en-tokens";
import { useMemo } from "react";
import { formatDownloadProgress } from "./useAIStatusPanel";
import { useAISettings } from "./useAISettings";

const t = enTokens.aiAssistant;

/**
 * Connects {@link AIStatusBadge} to the AI state, so the header always shows
 * which AI runs and, for the built-in one, whether it can run here and, on
 * hover, why not.
 */
export const useAIStatusBadge = (): AIStatusBadgeProps => {
  const {
    cloudConsent,
    browserAvailability,
    browserDownloadProgress,
    browserDownloadFailed,
  } = useAISettings();

  return useMemo((): AIStatusBadgeProps => {
    // The online AI works on any device, so the built-in status doesn't matter
    if (cloudConsent === "cloud") {
      return { label: t.badge.cloud, tooltip: t.cloud, tone: "success" };
    }
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
  }, [
    cloudConsent,
    browserAvailability,
    browserDownloadProgress,
    browserDownloadFailed,
  ]);
};
