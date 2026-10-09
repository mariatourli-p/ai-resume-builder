/** Longest text still treated as a skill, to drop sentences the AI adds */
const MAX_SKILL_LENGTH = 40;

/**
 * Turns the AI's skill list into clean, unique skills, leaving out the ones
 * the user already has (case-insensitive).
 *
 * @param result - The AI reply, comma- or line-separated
 * @param existing - Skills already applied
 * @returns At most 10 new skills, in the AI's order
 *
 * @example
 * parseSkillList("1. React, - TypeScript\n**Git**", ["git"]); // ["React", "TypeScript"]
 */
export const parseSkillList = (
  result: string,
  existing: string[] = [],
): string[] => {
  const seen = new Set(existing.map((skill) => skill.trim().toLowerCase()));
  const skills: string[] = [];

  for (const part of result.split(/[,\n;]/)) {
    const skill = part
      // Numbering, bullets and markdown the model may add anyway
      .replace(/^\s*(\d+[.)]|[-*•])\s*/, "")
      .replace(/[*_`"]/g, "")
      .trim()
      .replace(/\.$/, "");
    const key = skill.toLowerCase();

    if (!skill || skill.length > MAX_SKILL_LENGTH || seen.has(key)) continue;
    seen.add(key);
    skills.push(skill);
  }

  return skills.slice(0, 10);
};
