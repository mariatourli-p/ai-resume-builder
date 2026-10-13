import { askAI, isValidVerdict, VERDICT_CHOICES } from "@/services";

/** A bullet line: `- `, `* `, `• ` or `1. ` */
const BULLET_LINE = /^([-*•–]|\d+[.)])\s+\S/;

/**
 * Quick local check before asking the AI: every line must be a bullet, and
 * none may ask the user something or speak to them. Catches replies like
 * "Please provide the notes..." that the AI validator sometimes lets through.
 */
const isBulletList = (text: string): boolean => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.length > 0 &&
    lines.every(
      (line) =>
        BULLET_LINE.test(line) &&
        !line.includes("?") &&
        !/\byour?\b/i.test(line),
    )
  );
};

/**
 * Validates that the AI response is a list of achievement bullet points,
 * from a job or a volunteering role.
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
  if (!isBulletList(result)) return false;

  const validationPrompt = `You are a validator. Determine if the following text is a list of achievement bullet points that start with action verbs and describe real accomplishments from a job or a volunteering role.
It is INVALID if it asks for information, talks to the reader, or describes what it will do instead of listing achievements.
Reply ONLY with "VALID" or "INVALID". Nothing else.`;

  const validation = await askAI({
    prompt: validationPrompt,
    text: result,
    choices: VERDICT_CHOICES,
  });

  return isValidVerdict(validation);
};
