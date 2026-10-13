import { askAI } from "@/services";
import {
  VOLUNTEER_WORK_PROMPT,
  VOLUNTEER_WORK_RESPONSE_SCHEMA,
} from "@/services/aiPrompts";

/** Results per volunteering card text, so each one is checked once */
const checked = new Map<string, boolean>();

/**
 * Reads the AI's JSON reply. A reply that can't be read gives the user the
 * benefit of the doubt instead of rejecting their role.
 */
const parseReply = (reply: string): boolean => {
  try {
    const { isVolunteerWork } = JSON.parse(reply) as {
      isVolunteerWork?: unknown;
    };
    return isVolunteerWork !== false;
  } catch {
    return true;
  }
};

/**
 * Asks the built-in AI if a volunteering role says what the work was about
 * (a cause, field, task or organization), so it doesn't write made-up
 * achievements for a role like a placeholder or random letters.
 *
 * @param details - The volunteer role and organization, e.g.
 *   `Volunteer role: Tutor, Organization: Hope Center`
 * @returns `true` if the details show what the volunteer work was about
 * @throws {AIProviderError} If the AI request fails
 *
 * @example
 * await checkVolunteerWork("Volunteer role: Beach cleanup"); // true
 * await checkVolunteerWork("Volunteer role: asdfgh"); // false
 */
export const checkVolunteerWork = async (details: string): Promise<boolean> => {
  const trimmed = details.trim();
  if (!trimmed) return false;

  const cacheKey = trimmed.toLowerCase();
  const cached = checked.get(cacheKey);
  if (cached !== undefined) return cached;

  const reply = await askAI({
    prompt: VOLUNTEER_WORK_PROMPT,
    text: trimmed,
    responseSchema: VOLUNTEER_WORK_RESPONSE_SCHEMA,
  });
  const isVolunteerWork = parseReply(reply);

  if (import.meta.env.DEV) {
    console.info(
      `[AI] Volunteer work: ${JSON.stringify(trimmed)} → ${reply.trim()} → ${isVolunteerWork ? "accepted" : "rejected"}`,
    );
  }
  checked.set(cacheKey, isVolunteerWork);
  return isVolunteerWork;
};
