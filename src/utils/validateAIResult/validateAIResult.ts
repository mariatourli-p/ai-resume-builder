import { improveText } from "@/services";
import { AI_PROMPTS } from "@/services/aiPrompts";

/**
 * Validates the response from an AI call to ensure it is a professional bio/summary.
 * Makes a second API call to verify the result is valid content and not a request
 * for more information or commentary.
 *
 * @param apiKey - The API key used to authenticate the validation request
 * @param result - The AI-generated text to validate
 * @returns `true` if the result is a valid professional bio/summary, `false` otherwise
 *
 * @example
 * const isValid = await validateAIResult(apiKey, result);
 * if (!isValid) {
 *   dispatch(toggleDialog("moreContext"));
 * }
 */
export const validateAIResult = async (
  apiKey: string,
  result: string,
): Promise<boolean> => {
  try {
    const validation = await improveText({
      apiKey,
      prompt: AI_PROMPTS.validationPrompt,
      text: result,
    });

    return validation.trim() === "VALID";
  } catch {
    return false;
  }
};
