import { askAI } from "@/services";
import {
  VOLUNTEER_AREA_PROMPT,
  VOLUNTEER_AREA_RESPONSE_SCHEMA,
} from "@/services";

/** Longest area accepted from the AI, to drop rambling replies */
const MAX_AREA_LENGTH = 80;

/** Results per volunteering card text, so each one is resolved once */
const found = new Map<string, string | null>();

/**
 * Reads the AI's JSON reply. An empty area means the card doesn't say what
 * the work was about. A reply that can't be read gives the user the benefit
 * of the doubt: the role is written about as it is.
 */
const parseReply = (reply: string, details: string): string | null => {
  try {
    const { area } = JSON.parse(reply) as { area?: unknown };
    const name = typeof area === "string" ? area.trim() : "";
    if (!name) return null;
    return name.length <= MAX_AREA_LENGTH ? name : details;
  } catch {
    return details;
  }
};

/**
 * Asks the built-in AI what a volunteering role is about - its cause, field
 * or kind of work - so it can write achievements for that area, and doesn't
 * make them up for a placeholder or random letters.
 *
 * @param details - The volunteer role and organization, e.g.
 *   `Volunteer role: Tutor, Organization: Hope Center`
 * @returns The area of the work (e.g. "Education"), or `null` if neither
 *   the role nor the organization shows one
 * @throws {AIError} If the AI request fails
 *
 * @example
 * await findVolunteerArea("Volunteer role: Beach cleanup"); // "Environmental cleanup"
 * await findVolunteerArea("Volunteer role: asdfgh"); // null
 */
export const findVolunteerArea = async (
  details: string,
): Promise<string | null> => {
  // Nothing to look at: reject without asking the AI
  const trimmed = details.trim();
  if (!trimmed) return null;

  /**
   * The same role and organization were already checked (in any casing):
   * reuse the answer instead of waiting for the AI again
   */
  const cacheKey = trimmed.toLowerCase();
  if (found.has(cacheKey)) return found.get(cacheKey) ?? null;

  /**
   * One request to Chrome's built-in AI. The schema forces the reply to be
   * `{"area": "..."}`, so it can't answer with free text or questions.
   */
  const reply = await askAI({
    prompt: VOLUNTEER_AREA_PROMPT,
    text: trimmed,
    responseSchema: VOLUNTEER_AREA_RESPONSE_SCHEMA,
  });
  // Turns the JSON reply into the area, or `null` when the area is empty
  const area = parseReply(reply, trimmed);

  // Development only: shows in the console (F12) what the AI answered
  if (import.meta.env.DEV) {
    console.info(
      `[AI] Volunteer area: ${JSON.stringify(trimmed)} → ${reply.trim()} → ${area ?? "rejected"}`,
    );
  }
  // Remember the answer until the page reloads, rejections included
  found.set(cacheKey, area);
  return area;
};
