import { AIError, type GenerateParams } from "./types";

/**
 * Minimal typings for Chrome's built-in Prompt API (`LanguageModel`),
 * which is not part of the TypeScript DOM lib yet.
 * @see https://developer.chrome.com/docs/ai/prompt-api
 */
export type BrowserAIAvailability =
  "unavailable" | "downloadable" | "downloading" | "available";

/**
 * What the app knows about the built-in AI: Chrome's own answer, or
 * `"unsupported_browser"` when the browser has no built-in AI at all.
 * Chrome's `"unavailable"` then means this computer can't run the model.
 */
export type BrowserAIStatus = BrowserAIAvailability | "unsupported_browser";

type LanguageModelExpected = { type: "text"; languages: string[] };

type LanguageModelMonitor = {
  addEventListener: (
    type: "downloadprogress",
    listener: (event: { loaded: number }) => void,
  ) => void;
};

type LanguageModelSession = {
  /** `responseConstraint` (JSON Schema) forces the output shape - Chrome 137+ */
  prompt: (
    input: string,
    options?: { responseConstraint?: object },
  ) => Promise<string>;
  /** Copy that keeps the instructions but not later prompts */
  clone: () => Promise<LanguageModelSession>;
  destroy: () => void;
};

type LanguageModelApi = {
  availability: (options?: {
    expectedInputs?: LanguageModelExpected[];
    expectedOutputs?: LanguageModelExpected[];
  }) => Promise<BrowserAIAvailability>;
  create: (options?: {
    initialPrompts?: { role: "system"; content: string }[];
    expectedInputs?: LanguageModelExpected[];
    expectedOutputs?: LanguageModelExpected[];
    monitor?: (monitor: LanguageModelMonitor) => void;
  }) => Promise<LanguageModelSession>;
};

const TEXT_EN: LanguageModelExpected[] = [{ type: "text", languages: ["en"] }];

const getLanguageModel = (): LanguageModelApi | undefined =>
  (globalThis as { LanguageModel?: LanguageModelApi }).LanguageModel;

/**
 * Reports whether the built-in model can be used in this browser.
 * `"downloadable"` / `"downloading"` are usable - the first prompt waits
 * for the one-time model download.
 *
 * - No `LanguageModel` (another browser, or an old Chrome), or a check that
 *   throws: `"unsupported_browser"`
 * - Chrome's `"unavailable"`: the browser has the AI, but this computer
 *   doesn't meet its requirements
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

type DownloadProgressListener = (progress: number) => void;

const downloadListeners = new Set<DownloadProgressListener>();

/**
 * Subscribes to the one-time model download progress (`0` → `1`).
 * Fires for every session created while the model is still downloading.
 *
 * @returns A function that removes the listener.
 */
export const onBrowserAIDownloadProgress = (
  listener: DownloadProgressListener,
): (() => void) => {
  downloadListeners.add(listener);
  return () => downloadListeners.delete(listener);
};

const monitor = (m: LanguageModelMonitor) => {
  m.addEventListener("downloadprogress", (event) => {
    downloadListeners.forEach((listener) => listener(event.loaded));
  });
};

/**
 * Starts the one-time model download ahead of the first AI request.
 * Runs from the Settings "Download AI model" button, because Chrome
 * only allows the download after a user gesture.
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

/**
 * One ready session per system prompt. Creating a session loads the model
 * and processes the instructions, which takes seconds - so it happens once,
 * and every request works on a cheap clone (keeping the base history clean).
 */
const baseSessions = new Map<string, Promise<LanguageModelSession>>();

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
 * Forgets the ready session of a prompt, so the next request creates a new
 * one. Used after a failure: a session Chrome has dropped (e.g. after its AI
 * process restarted) would make every later request with it fail.
 */
const discardBaseSession = (prompt: string) => {
  const base = baseSessions.get(prompt);
  baseSessions.delete(prompt);
  base?.then((session) => session.destroy()).catch(() => undefined);
};

/** Runs one request on a clone of the prompt's ready session. */
const runRequest = async (
  languageModel: LanguageModelApi,
  { prompt, text, choices, responseSchema }: GenerateParams,
): Promise<string> => {
  let session: LanguageModelSession | undefined;
  try {
    const base = await getBaseSession(languageModel, prompt);
    session = await base.clone();

    const responseConstraint = choices
      ? { type: "string", enum: choices }
      : responseSchema;
    return await session.prompt(
      text,
      responseConstraint ? { responseConstraint } : undefined,
    );
  } finally {
    session?.destroy();
  }
};

/**
 * Sends one request to the on-device model through Chrome's Prompt API.
 * Free and needs no API key. Retries once on a fresh session.
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

  try {
    return await runRequest(languageModel, params);
  } catch (error) {
    if (error instanceof AIError) throw error;
    // One retry on a fresh session fixes a session Chrome has dropped
    discardBaseSession(params.prompt);
  }

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
