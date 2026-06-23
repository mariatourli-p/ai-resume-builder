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
2. Keep the meaning and specifics intact — do not add or remove achievements
3. Return ONLY the rewritten sentence. No explanations, no preamble, no quotes.`,
} as const;

export const AI_PROMPTS = {
  ...WORK_EXPERIENCE_PROMPTS,
  smartRewrite: `You are a resume writer. Rewrite the input as a 2-3 sentence professional summary in first person.
Return ONLY the summary text.
No markdown, no headings, no bullet points, no questions, no commentary, no offers to help.`,

  enhance: `You are a resume writer. Improve the following resume text to be more professional and impactful.
Return ONLY the improved text. No explanations, no markdown, no questions.`,

  suggestSkills: `Suggest 10 relevant skills for this job title.
Return ONLY a comma-separated list. No numbering, no explanations, no markdown.`,
} as const;
