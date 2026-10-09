export const WORK_EXPERIENCE_PROMPTS = {
  quantifyMetrics: `You are a resume writer. Rewrite the input as 2-3 resume bullet points.
Rules:
1. Use strong action verbs (Spearheaded, Drove, Built, Delivered, Optimized)
2. If input is vague, make reasonable assumptions and use placeholders like [feature name], [X%], [N users]
3. Each bullet MUST start with the exact marker: BULLET::
4. Return ONLY the bullet lines, nothing else
5. No headings, no markdown, no explanations, no questions

Example output:
BULLET::Spearheaded development of payment module, reducing transaction time by 40%
BULLET::Built REST APIs serving 10K+ daily users, improving response time by 25%`,

  strongerVerbs: `You are an expert resume writer.
Rewrite the provided resume bullet point using stronger, more authoritative action verbs.
Rules:
1. Replace weak verbs (helped, worked on, assisted, responsible for) with powerful ones (Drove, Led, Architected, Delivered, Scaled)
2. Keep the meaning and specifics intact - do not add or remove achievements
3. Return ONLY the rewritten sentence. No explanations, no preamble, no quotes.`,
} as const;

export const AI_PROMPTS = {
  ...WORK_EXPERIENCE_PROMPTS,
  smartRewrite: `You are a resume writer. Write a professional bio in first person for the given job title.
Keep it to a maximum of 4 lines, concise and impactful.
Return ONLY the bio text.
No markdown, no bullet points, no questions, no commentary.`,

  suggestSkills: `You are a resume writer. Suggest 10 relevant skills for the given job title.
If current skills are given, suggest different ones that fit them, and do not repeat any of them.
Keep each skill short (1-4 words).
Return ONLY a comma-separated list. No numbering, no explanations, no markdown.`,
  validationPrompt: `You are a validator. Determine if the following text is a professional bio or resume summary, with no questions, no requests for more information, and no commentary.
Reply ONLY with "VALID" or "INVALID". Nothing else.`,
  generateAchievements: `You are a resume writer. Write exactly 3 professional bullet points for key achievements and milestones for the given job title.
Each bullet should start with a strong action verb and be concise and impactful.
Format EXACTLY like this:
- <achievement 1>
- <achievement 2>
- <achievement 3>
No markdown, no commentary, no extra text.`,
} as const;

/**
 * Instructions for turning what the user typed in a job title field - a full
 * title or just a keyword - into the profession it points to. The reply
 * follows {@link JOB_TITLE_RESPONSE_SCHEMA}.
 */
export const JOB_TITLE_PROMPT = `You read what a user typed in the job title field of a resume. The resume is in English.
It may be a full job title, or only a keyword linked to a kind of work: a skill, technology, tool, task, material, object or field.
Find the profession it points to:
- A job title: keep it, only fixing obvious typos.
- A keyword: give the most likely job title of someone who works with it, keeping any specialty it shows.
Write the job title in English.
Set isProfession to false if the input is not in English, or if it can't be linked to any kind of work: random letters, made-up words, a person's name, a greeting or a sentence.
When unsure, link it to the closest profession.

Examples:
nurse -> {"isProfession": true, "jobTitle": "Nurse"}
Sr. accountant -> {"isProfession": true, "jobTitle": "Senior Accountant"}
React -> {"isProfession": true, "jobTitle": "React Developer"}
stethoscope -> {"isProfession": true, "jobTitle": "Doctor"}
bookkeeping -> {"isProfession": true, "jobTitle": "Bookkeeper"}
paint roller -> {"isProfession": true, "jobTitle": "Painter"}
asdfgh -> {"isProfession": false, "jobTitle": ""}
hello there -> {"isProfession": false, "jobTitle": ""}`;

/** Shape of the reply to {@link JOB_TITLE_PROMPT} */
export const JOB_TITLE_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    isProfession: { type: "boolean" },
    jobTitle: { type: "string" },
  },
  required: ["isProfession", "jobTitle"],
};
