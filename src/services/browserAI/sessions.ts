import { monitor } from "./download";
import {
  TEXT_EN,
  type LanguageModelApi,
  type LanguageModelSession,
} from "./languageModel";
import { AIError, type GenerateParams } from "./types";

/**
 * One ready session per system prompt. Creating a session loads the model
 * and processes the instructions, which takes seconds - so it happens once,
 * and every request works on a cheap clone (keeping the base history clean).
 */
const baseSessions = new Map<string, Promise<LanguageModelSession>>();

/**
 * Creates the ready session of a prompt. When: the first request with that
 * prompt, or the next one after the session was discarded. Checks the
 * computer can run the model first, so the user gets the right message.
 *
 * @throws {AIError} `unsupported_device` or `download_failed`
 */
const createBaseSession = async (
  languageModel: LanguageModelApi,
  prompt: string,
): Promise<LanguageModelSession> => {
  const status = await languageModel.availability({
    expectedInputs: TEXT_EN,
    expectedOutputs: TEXT_EN,
  });
  // The browser has the AI, but this computer can't run the model
  if (status === "unavailable") {
    throw new AIError(
      "unsupported_device",
      "This computer doesn't meet the built-in AI requirements.",
    );
  }

  try {
    return await languageModel.create({
      initialPrompts: [{ role: "system", content: prompt }],
      expectedInputs: TEXT_EN,
      expectedOutputs: TEXT_EN,
      monitor,
    });
  } catch (error) {
    /**
     * Until the model is on the computer, creating a session also downloads
     * it, so a failure here is the download: usually not enough disk space
     * or a lost connection. Retrying right away won't help, so the user
     * gets its own message.
     */
    if (status !== "available") {
      throw new AIError(
        "download_failed",
        error instanceof Error
          ? error.message
          : "The AI model download failed.",
      );
    }
    throw error;
  }
};

/**
 * Returns the prompt's ready session from the cache, creating it if needed.
 * When: every request. Requests that arrive while it is being created share
 * the same promise instead of creating a second session.
 */
const getBaseSession = (
  languageModel: LanguageModelApi,
  prompt: string,
): Promise<LanguageModelSession> => {
  let base = baseSessions.get(prompt);
  if (!base) {
    base = createBaseSession(languageModel, prompt);
    // Don't cache a failed session, so the next request can retry
    base.catch(() => baseSessions.delete(prompt));
    baseSessions.set(prompt, base);
  }
  return base;
};

/**
 * Forgets and destroys the ready session of a prompt, so the next request
 * creates a new one. When: after a failed request. A session Chrome has
 * dropped (e.g. after its AI process restarted) would make every later
 * request with it fail.
 */
export const discardBaseSession = (prompt: string) => {
  const base = baseSessions.get(prompt);
  baseSessions.delete(prompt);
  base?.then((session) => session.destroy()).catch(() => undefined);
};

/**
 * Sends one request to the model and returns its reply text. When: every
 * AI call, through `generateWithBrowserAI`. Works on a clone of the ready
 * session, so requests never see each other, and always destroys the clone.
 * Errors are not caught here: `generateWithBrowserAI` retries them.
 */
export const runRequest = async (
  languageModel: LanguageModelApi,
  { prompt, text, choices, responseSchema }: GenerateParams,
): Promise<string> => {
  let session: LanguageModelSession | undefined;
  try {
    const base = await getBaseSession(languageModel, prompt);
    session = await base.clone();

    // `choices` limits the reply to one word, `responseSchema` to a JSON shape
    const responseConstraint = choices
      ? { type: "string", enum: choices }
      : responseSchema;
    // `await` keeps the clone alive until the reply is in, before `finally`
    return await session.prompt(
      text,
      responseConstraint ? { responseConstraint } : undefined,
    );
  } finally {
    session?.destroy();
  }
};
