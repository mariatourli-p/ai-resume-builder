import { AI_CONFIG } from "./constants";

/**
 * Sends a text improvement request to the Anthropic API.
 *
 * @param apiKey - The user's Anthropic API key, passed via `x-api-key` header.
 * @param prompt - The resolved system instruction string (e.g. the full prompt text
 *   from {@link AI_PROMPTS}). Sent as the `system` field to constrain Claude's behavior.
 * @param text - The raw user content to improve (e.g. achievements, summary).
 *   Sent as the sole `user` message.
 * @returns The improved text string from Claude's first content block.
 * @throws If the API response is not ok.
 */
export const improveText = async ({
  apiKey,
  prompt,
  text,
}: {
  apiKey: string;
  /** Resolved prompt text — not a key, the actual instruction string */
  prompt: string;
  text: string;
}): Promise<string> => {
  const body = {
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    system: prompt,
    messages: [{ role: "user", content: text }],
  };

  const response = await fetch(AI_CONFIG.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": AI_CONFIG.apiVersion,
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();

  return data.content[0].text;
};
