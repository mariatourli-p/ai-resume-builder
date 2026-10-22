import {
  getLanguageModel,
  TEXT_EN,
  type BrowserAIStatus,
} from "./languageModel";

/**
 * Asks Chrome whether the built-in model can run here. When: on app start
 * and after a model download (`AISettingsProvider`), for the header's AI
 * status and the "not supported" messages.
 *
 * - `"available"`: ready
 * - `"downloadable"` / `"downloading"`: usable; the first request waits for
 *   the one-time model download
 * - `"unavailable"`: the browser has the AI, but this computer doesn't meet
 *   its requirements
 * - `"unsupported_browser"`: no `LanguageModel` (another browser, or an old
 *   Chrome), or a check that throws
 */
export const getBrowserAIAvailability = async (): Promise<BrowserAIStatus> => {
  const languageModel = getLanguageModel();
  if (!languageModel) return "unsupported_browser";

  try {
    return await languageModel.availability({
      expectedInputs: TEXT_EN,
      expectedOutputs: TEXT_EN,
    });
  } catch {
    return "unsupported_browser";
  }
};
