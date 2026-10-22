import { getLanguageModel } from "./languageModel";
import { discardBaseSession, runRequest } from "./sessions";
import { AIError, type GenerateParams } from "./types";

/**
 * Sends one request to the on-device model through Chrome's Prompt API and
 * returns its reply text. Free and needs no API key. When: every AI call in
 * the app, through `askAI`. Tries twice: the second try runs on a fresh
 * session, which fixes a session Chrome has dropped.
 *
 * @throws {AIError} If the built-in AI is unavailable or the request fails
 */
export const generateWithBrowserAI = async (
  params: GenerateParams,
): Promise<string> => {
  const languageModel = getLanguageModel();

  if (!languageModel) {
    throw new AIError(
      "unsupported",
      "Built-in AI is not available in this browser.",
    );
  }

  // First try
  try {
    return await runRequest(languageModel, params);
  } catch (error) {
    // Already explained (device, download): retrying won't help
    if (error instanceof AIError) throw error;
    discardBaseSession(params.prompt);
  }

  // Second try, on a fresh session
  try {
    return await runRequest(languageModel, params);
  } catch (error) {
    if (error instanceof AIError) throw error;
    // Removed so the user's next click starts on a fresh session too
    discardBaseSession(params.prompt);

    if (import.meta.env.DEV) {
      console.error("[AI] Request failed:", error);
    }
    const isUnsupported =
      error instanceof DOMException && error.name === "NotSupportedError";
    throw new AIError(
      isUnsupported ? "unsupported" : "request_failed",
      error instanceof Error ? error.message : "Built-in AI request failed.",
    );
  }
};
