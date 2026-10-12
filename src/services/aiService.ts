import { browserProvider, type GenerateParams } from "./providers";

/**
 * Sends a text improvement request to the built-in browser AI, which runs
 * on the user's device for free.
 *
 * @param prompt - The resolved system instruction string (e.g. the full prompt text
 *   from {@link AI_PROMPTS}).
 * @param text - The raw user content to improve (e.g. achievements, summary).
 * @returns The improved text string.
 * @throws {AIProviderError} If the built-in AI is unavailable or the request fails.
 */
export const improveText = (params: GenerateParams): Promise<string> =>
  browserProvider.generate(params);

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
