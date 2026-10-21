import {
  browserProvider,
  cloudProvider,
  getBrowserAIAvailability,
  type GenerateParams,
} from "./providers";

/**
 * How long the online AI is skipped after it fails. One AI click makes up
 * to three requests: without the pause, each would wait for the failure
 * again before Chrome's built-in AI takes over.
 */
const CLOUD_PAUSE_MS = 60_000;

/** Whether the user agreed to send their text to the online AI */
let isCloudAllowed = false;
/** Time until which the online AI is skipped after a failure */
let cloudPausedUntil = 0;
/** Why the online AI last failed, shown if no built-in AI can step in */
let lastCloudError: unknown = null;

/**
 * Turns the online AI on or off. Called by `AISettingsProvider` whenever the
 * user's choice in the consent dialog or Settings changes.
 */
export const allowCloudAI = (allowed: boolean) => {
  isCloudAllowed = allowed;
};

/** Whether Chrome's built-in AI can take a request on this computer */
const canUseBrowserAI = async () => {
  const status = await getBrowserAIAvailability();
  return status !== "unsupported_browser" && status !== "unavailable";
};

/**
 * Sends one request to the AI. Used both to write text (summary,
 * achievements, skills) and to check it (job titles, volunteer work,
 * validators).
 *
 * The online AI (Gemini, through `api/generate.ts`) answers first when the
 * user allowed it: it writes better text and works on any device. When it
 * fails or its free daily quota is used up, Chrome's built-in AI (Gemini
 * Nano, on the user's computer) answers instead, if this computer has it,
 * and keeps answering for {@link CLOUD_PAUSE_MS}.
 *
 * @param prompt - The resolved system instruction string (e.g. the full prompt text
 *   from {@link AI_PROMPTS}).
 * @param text - The user content the AI works on (e.g. a job title, notes).
 * @returns The AI's reply as text.
 * @throws {AIProviderError} If no AI can take the request or it fails.
 */
export const askAI = async (params: GenerateParams): Promise<string> => {
  if (!isCloudAllowed) return browserProvider.generate(params);

  if (Date.now() < cloudPausedUntil) {
    // Without the built-in AI, show why the online AI failed, not "unsupported"
    if (!(await canUseBrowserAI())) throw lastCloudError;
    return browserProvider.generate(params);
  }

  try {
    return await cloudProvider.generate(params);
  } catch (error) {
    // Skip the online AI for a while instead of waiting for it every time
    cloudPausedUntil = Date.now() + CLOUD_PAUSE_MS;
    lastCloudError = error;
    if (!(await canUseBrowserAI())) throw error;
    if (import.meta.env.DEV) {
      console.info("[AI] Online AI failed, using Chrome's built-in AI", error);
    }
    return browserProvider.generate(params);
  }
};

/** The two answers validators allow, used to constrain the model's output */
export const VERDICT_CHOICES = ["VALID", "INVALID"];

/**
 * Lenient check for the validators' verdict. Models may JSON-quote it,
 * change casing, add punctuation or repeat the input
 * (e.g. `"plumber -> VALID"`, `The input is valid.`).
 */
export const isValidVerdict = (verdict: string): boolean => {
  const normalized = verdict.toUpperCase();
  if (/\bINVALID\b|\bNOT\s+VALID\b/.test(normalized)) return false;
  return /\bVALID\b/.test(normalized);
};
