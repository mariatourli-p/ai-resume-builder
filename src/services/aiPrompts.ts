export const AI_PROMPTS = {
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
  generateAchievements: `You are a resume writer. Write professional bullet points for the key achievements and milestones of the given role.
If the role title as written is given, use all of its keywords (skills, tools, technologies, specialties), not only the job title.
If the user's notes are given, build the bullets from them: keep every fact, number, name, tool and keyword they mention, improve the wording, and don't drop any of their achievements.
If only the job title is given, that is enough: write typical achievements for that role.
Write 3 bullets, or up to 5 if the notes describe more achievements.
Each bullet should start with a strong action verb and be concise and impactful.
Never ask for more information and never talk to the user. Always write the bullets.
Format EXACTLY like this:
- <achievement 1>
- <achievement 2>
- <achievement 3>
No markdown, no commentary, no extra text.`,
  generateVolunteeringAchievements: `You are a resume writer. Write bullet points for an unpaid volunteering role on a resume.
The volunteer role may be a title, a cause or an area of work. Use it, the area of work and the organization, if given, to understand the cause and the work done.
This is volunteering, not a paid job. Focus on the impact on people and the community: people reached or helped, events and campaigns organized, funds raised, time given, and the skills used.
Never mention salaries, sales, revenue, profit or business clients.
If the user's notes are given, build the bullets from them: keep every fact, number, name, tool and keyword they mention, improve the wording, and don't drop any of their achievements.
If only the volunteer role is given, that is enough: write typical achievements for that role.
Write 3 bullets, or up to 5 if the notes describe more achievements.
Each bullet should start with a strong action verb and be concise and impactful.
Never ask for more information and never talk to the user. Always write the bullets.
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

/**
 * Instructions for finding what a volunteering card is about - its cause,
 * field or kind of work - before the AI writes its achievements. Volunteer
 * titles are often a cause or an area, not a profession, so they can't use
 * {@link JOB_TITLE_PROMPT}. Naming the area is easier for a small model than
 * a yes/no judgment. The reply follows {@link VOLUNTEER_AREA_RESPONSE_SCHEMA}.
 */
export const VOLUNTEER_AREA_PROMPT = `You read the volunteer role and, if given, the organization from a volunteering entry on a resume.
Write in a few words the area of the volunteer work: its cause, field, task, or the people or animals it helps.
Look at the role first. If the role shows an area, use it, even if the organization is unclear or meaningless.
If the role doesn't show one, use the organization.
Write an empty area if neither shows one: generic words for a role, a position or a group, numbers, placeholders, random letters, made-up words, a person's name or a greeting.
Write the area in English.

Examples:
Volunteer role: Beach cleanup, Organization: xkqwe zzt -> {"area": "Environmental cleanup"}
Volunteer role: Member, Organization: City Food Bank -> {"area": "Food assistance"}
Volunteer role: Tutor -> {"area": "Education"}
Volunteer role: Dog walker -> {"area": "Animal welfare"}
Volunteer role: Helper 2, Organization: qwerty zxcv -> {"area": ""}
Volunteer role: Position A -> {"area": ""}`;

/** Shape of the reply to {@link VOLUNTEER_AREA_PROMPT} */
export const VOLUNTEER_AREA_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    area: { type: "string" },
  },
  required: ["area"],
};
