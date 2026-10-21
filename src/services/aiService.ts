import { browserProvider, type GenerateParams } from "./providers";

/**
 * Sends one request to the built-in browser AI, which runs on the user's
 * device for free. Used both to write text (summary, achievements, skills)
 * and to check it (job titles, volunteer work, validators).
 *
 * @param prompt - The resolved system instruction string (e.g. the full prompt text
 *   from {@link AI_PROMPTS}).
 * @param text - The user content the AI works on (e.g. a job title, notes).
 * @returns The AI's reply as text.
 * @throws {AIProviderError} If the built-in AI is unavailable or the request fails.
 */
export const askAI = (params: GenerateParams): Promise<string> =>
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
