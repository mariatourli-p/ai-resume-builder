import {
  improveText,
  isValidVerdict,
  VERDICT_CHOICES,
} from "@/services";

/**
 * Validates that the AI response is a list of professional achievement bullet points.
 * Makes a second AI call to verify the result contains actual achievements
 * and not requests for more information or commentary.
 *
 * @param result - The AI-generated bullet points to validate
 * @returns `true` if the result is a valid list of achievement bullet points, `false` otherwise
 * @throws {AIProviderError} If the validation request itself fails, so the
 *   caller can show the real error instead of asking for more context.
 *
 * @example
 * const isValid = await validateAchievementsResult(result);
 * if (!isValid) {
 *   dispatch(toggleDialog("moreContext"));
 * }
 */
export const validateAchievementsResult = async (
  result: string,
): Promise<boolean> => {
  const validationPrompt = `You are a validator. Determine if the following text is a list of professional achievement bullet points that start with action verbs and describe real work accomplishments.
Reply ONLY with "VALID" or "INVALID". Nothing else.`;

  const validation = await improveText({
    prompt: validationPrompt,
    text: result,
    choices: VERDICT_CHOICES,
  });

  return isValidVerdict(validation);
};
