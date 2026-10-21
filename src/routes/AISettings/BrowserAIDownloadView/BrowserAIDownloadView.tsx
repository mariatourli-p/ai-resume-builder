import { DownloadProgressToast } from "@/components/Feedback/DownloadProgressToast";
import { formatDownloadProgress } from "../useAIStatusPanel";
import { useAISettings } from "../AISettingsProvider";

/** Shows the built-in AI model download progress anywhere in the app. */
export const BrowserAIDownloadView = () => {
  const { browserDownloadProgress } = useAISettings();

  return (
    <DownloadProgressToast
      open={browserDownloadProgress !== null}
      message={formatDownloadProgress(browserDownloadProgress ?? 0)}
      progress={browserDownloadProgress ?? 0}
    />
  );
};
