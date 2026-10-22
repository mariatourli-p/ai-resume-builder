import {
  getLanguageModel,
  TEXT_EN,
  type LanguageModelMonitor,
} from "./languageModel";

type DownloadProgressListener = (progress: number) => void;

const downloadListeners = new Set<DownloadProgressListener>();

/**
 * Subscribes to the one-time model download progress (`0` → `1`). When:
 * `AISettingsProvider` subscribes on app start, for the progress bar and the
 * toast. Fires for every session created while the model is downloading.
 *
 * @returns A function that removes the listener.
 */
export const onBrowserAIDownloadProgress = (
  listener: DownloadProgressListener,
): (() => void) => {
  downloadListeners.add(listener);
  return () => downloadListeners.delete(listener);
};

/**
 * Passed to every `create()`: forwards Chrome's download progress to the
 * listeners above, whether the download started from Settings or from the
 * first AI request.
 */
export const monitor = (m: LanguageModelMonitor) => {
  m.addEventListener("downloadprogress", (event) => {
    downloadListeners.forEach((listener) => listener(event.loaded));
  });
};

/**
 * Starts the one-time model download ahead of the first AI request. When:
 * the user clicks "Download AI model" in Settings, because Chrome only
 * allows the download after a user gesture. The empty session it creates is
 * destroyed right away; it only triggers the download.
 */
export const prepareBrowserAI = async (): Promise<void> => {
  const languageModel = getLanguageModel();
  if (!languageModel) return;

  const session = await languageModel.create({
    expectedInputs: TEXT_EN,
    expectedOutputs: TEXT_EN,
    monitor,
  });
  session.destroy();
};
