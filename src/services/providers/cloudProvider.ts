import { ApiError, postGenerate } from "@/services/api";
import { AIProviderError, type AIProvider, type GenerateParams } from "./types";

/**
 * Lines the online AI never gets, even though Chrome's built-in AI does:
 * the organization a user worked or volunteered at says more about who they
 * are than the role, and the bullets don't need it.
 */
const DEVICE_ONLY_LINE = /(^|,\s*)Organization:.*$/gm;

/** Removes the details that stay on the user's device */
const removeDeviceOnlyDetails = (text: string): string =>
  text
    .replace(DEVICE_ONLY_LINE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** Reads the streamed reply, reporting the text so far after each piece. */
const readStream = async (
  body: ReadableStream<Uint8Array>,
  onChunk: (textSoFar: string) => void,
): Promise<string> => {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return result + decoder.decode();
    result += decoder.decode(value, { stream: true });
    onChunk(result);
  }
};

/**
 * Turns a failed backend request into the error the AI dialogs understand:
 * a 429 means the online AI is busy, anything else that the request failed.
 * The backend's error stays in `cause`, for debugging.
 */
const toProviderError = (error: unknown): AIProviderError => {
  const status = error instanceof ApiError ? error.status : null;
  if (status === 429) {
    return new AIProviderError("cloud_limit", "The online AI is busy.", {
      cause: error,
    });
  }
  return new AIProviderError(
    "request_failed",
    `The online AI request failed (${status ?? "network"}).`,
    { cause: error },
  );
};

/**
 * Google's Gemini model, through the app's serverless function so the API
 * key stays on the server. Used only after the user agreed to send their
 * text online; the details in {@link DEVICE_ONLY_LINE} are left out.
 */
export const cloudProvider: AIProvider = {
  generate: async ({
    prompt,
    text,
    onChunk,
    choices,
    responseSchema,
  }: GenerateParams) => {
    // Structured replies can't be shown while they're written
    const stream = Boolean(onChunk) && !choices && !responseSchema;
    const response = await postGenerate({
      prompt,
      text: removeDeviceOnlyDetails(text),
      stream,
      choices,
      responseSchema,
    }).catch((error: unknown) => {
      throw toProviderError(error);
    });

    if (stream && onChunk) return readStream(response.body, onChunk);
    const { text: reply } = (await response.json()) as { text: string };
    return reply;
  },
};
