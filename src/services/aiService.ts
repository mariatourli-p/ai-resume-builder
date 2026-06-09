export const improveText = async (
  apiKey: string,
  prompt: string,
  text: string,
): Promise<string> => {
  const response = await fetch("/api/anthropic/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: `${prompt}\n\n${text}` }],
    }),
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();
  return data.content[0].text;
};
