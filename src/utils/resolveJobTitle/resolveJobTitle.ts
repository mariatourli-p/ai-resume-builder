import { improveText } from "@/services";
import {
  JOB_TITLE_PROMPT,
  JOB_TITLE_RESPONSE_SCHEMA,
} from "@/services/aiPrompts";

/** Longest job title accepted from the AI, to drop rambling replies */
const MAX_JOB_TITLE_LENGTH = 80;

/** Results per title, so each title is resolved once */
const resolved = new Map<string, string | null>();

/**
 * Reads the AI's JSON reply. A reply that can't be read gives the user's
 * own title the benefit of the doubt instead of rejecting it.
 */
const parseReply = (reply: string, title: string): string | null => {
  try {
    const { isProfession, jobTitle } = JSON.parse(reply) as {
      isProfession?: unknown;
      jobTitle?: unknown;
    };
    if (isProfession === false) return null;

    const name = typeof jobTitle === "string" ? jobTitle.trim() : "";
    return name && name.length <= MAX_JOB_TITLE_LENGTH ? name : title;
  } catch {
    return title;
  }
};

/**
 * Asks the built-in AI which profession the user's input points to. Works
 * for full job titles and for keywords
 * (a skill, tool, technology or field), so the AI can write about the
 * profession instead of the keyword.
 *
 * @param title - What the user typed in the job title field
 * @returns The job title to write about, or `null` if the input isn't in
 *   English or can't be linked to any kind of work
 * @throws {AIProviderError} If the AI request fails
 *
 * @example
 * await resolveJobTitle("Sr. accountant"); // "Senior Accountant"
 * await resolveJobTitle("asdfgh"); // null
 */
export const resolveJobTitle = async (
  title: string,
): Promise<string | null> => {
  const trimmed = title.trim();
  if (!trimmed) return null;

  const cacheKey = trimmed.toLowerCase();
  if (resolved.has(cacheKey)) return resolved.get(cacheKey) ?? null;

  const reply = await improveText({
    prompt: JOB_TITLE_PROMPT,
    text: trimmed,
    responseSchema: JOB_TITLE_RESPONSE_SCHEMA,
  });
  console.log("🚀 ~ resolveJobTitle ~ reply:", reply, resolved);

  const jobTitle = parseReply(reply, trimmed);

  if (import.meta.env.DEV) {
    console.info(
      `[AI] Job title: "${trimmed}" → ${reply.trim()} → ${jobTitle ?? "rejected"}`,
    );
  }
  resolved.set(cacheKey, jobTitle);
  return jobTitle;
};
