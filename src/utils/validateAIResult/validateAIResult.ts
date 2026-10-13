import { askAI, isValidVerdict, VERDICT_CHOICES } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";

/**
 * Validates the response from an AI call to ensure it is a professional bio/summary.
 * Makes a second AI call to verify the result is valid content and not a request
 * for more information or commentary.
 *
 * @param result - The AI-generated text to validate
 * @returns `true` if the result is a valid professional bio/summary, `false` otherwise
 * @throws {AIProviderError} If the validation request itself fails, so the
 *   caller can show the real error instead of asking for more context.
 *
 * @example
 * const isValid = await validateAIResult(result);
 * if (!isValid) {
 *   dispatch(toggleDialog("moreContext"));
 * }
 */
export const validateAIResult = async (result: string): Promise<boolean> => {
  const validation = await askAI({
    prompt: AI_PROMPTS.validationPrompt,
    text: result,
    choices: VERDICT_CHOICES,
  });

  return isValidVerdict(validation);
};
