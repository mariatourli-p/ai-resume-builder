import { postJson, type ApiResponse } from "./apiClient";
import { API_URLS } from "./urls";

/** What the browser sends to `/api/generate`; the server reads the same shape */
export type GenerateRequest = {
  /** One of the system prompts in `src/services/aiPrompts.ts` */
  prompt: string;
  text: string;
  /** Answer as a plain-text stream instead of `{ text }` */
  stream?: boolean;
  choices?: string[];
  responseSchema?: object;
};

/**
 * Sends one AI request to the app's backend.
 *
 * @returns The response: `{ text }` as JSON, or a plain-text stream when
 * `request.stream` is set.
 * @throws {ApiError} When the network fails or the server answers with an error.
 */
export const postGenerate = (request: GenerateRequest): Promise<ApiResponse> =>
  postJson(API_URLS.generate, request);
