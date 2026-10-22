/**
 * Types for Chrome's built-in Prompt API (`LanguageModel`), which TypeScript's
 * DOM types don't include yet, and the one place in the app that reads it.
 * @see https://developer.chrome.com/docs/ai/prompt-api
 */

/** Chrome's answer to `LanguageModel.availability()` */
export type BrowserAIAvailability =
  "unavailable" | "downloadable" | "downloading" | "available";

/**
 * What the app knows about the built-in AI: Chrome's own answer, or
 * `"unsupported_browser"` when the browser has no built-in AI at all.
 * Chrome's `"unavailable"` then means this computer can't run the model.
 */
export type BrowserAIStatus = BrowserAIAvailability | "unsupported_browser";

export type LanguageModelExpected = { type: "text"; languages: string[] };

export type LanguageModelMonitor = {
  addEventListener: (
    type: "downloadprogress",
    listener: (event: { loaded: number }) => void,
  ) => void;
};

export type LanguageModelSession = {
  /** `responseConstraint` (JSON Schema) forces the output shape - Chrome 137+ */
  prompt: (
    input: string,
    options?: { responseConstraint?: object },
  ) => Promise<string>;
  /** Copy that keeps the instructions but not later prompts */
  clone: () => Promise<LanguageModelSession>;
  destroy: () => void;
};

export type LanguageModelApi = {
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

/** The AI reads and writes English only; Chrome checks the model supports it */
export const TEXT_EN: LanguageModelExpected[] = [
  { type: "text", languages: ["en"] },
];

/**
 * Returns Chrome's `LanguageModel`, or `undefined` in a browser without it.
 * When: at the start of every AI call. Read through `globalThis` so other
 * browsers get `undefined` instead of a `ReferenceError`.
 */
export const getLanguageModel = (): LanguageModelApi | undefined =>
  (globalThis as { LanguageModel?: LanguageModelApi }).LanguageModel;
