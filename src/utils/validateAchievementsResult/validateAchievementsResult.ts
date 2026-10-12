import { improveText } from "@/services";

/**
 * Validates that the AI response is a list of professional achievement bullet points.
 * Makes a second API call to verify the result contains actual achievements
 * and not requests for more information or commentary.
 *
 * @param apiKey - The API key used to authenticate the validation request
 * @param result - The AI-generated bullet points to validate
 * @returns `true` if the result is a valid list of achievement bullet points, `false` otherwise
 *
 * @example
 * const isValid = await validateAchievementsResult(apiKey, result);
 * if (!isValid) {
 *   dispatch(toggleDialog("moreContext"));
 * }
 */
export const validateAchievementsResult = async (
  apiKey: string,
  result: string,
): Promise<boolean> => {
  const validationPrompt = `You are a validator. Determine if the following text is a list of professional achievement bullet points that start with action verbs and describe real work accomplishments.
Reply ONLY with "VALID" or "INVALID". Nothing else.`;

  try {
    const validation = await improveText({
      apiKey,
      prompt: validationPrompt,
      text: result,
    });

    return validation.trim() === "VALID";
  } catch {
    return false;
  }
};
