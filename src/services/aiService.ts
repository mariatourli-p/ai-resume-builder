import { AI_CONFIG } from "./constants";

export const improveText = async (
  apiKey: string,
  prompt: string,
  text: string,
): Promise<string> => {
  const body = {
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    system: prompt,
    messages: [{ role: "user", content: text }],
  };

  console.log("📤 API body:", body);

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
