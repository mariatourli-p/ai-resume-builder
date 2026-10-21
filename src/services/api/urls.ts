/** The app's backend endpoints: the serverless functions in the `api/` folder */
export const API_URLS = {
  /** `api/generate.ts`: one AI request, answered by Gemini */
  generate: "/api/generate",
} as const;
