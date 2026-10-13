export type GenerateParams = {
  /** Resolved prompt text - the system instruction, not a prompt key */
  prompt: string;
  /** The raw user content to improve */
  text: string;
  /** Receives the text generated so far while the model writes it */
  onChunk?: (textSoFar: string) => void;
  /**
   * Forces the answer to be exactly one of these words (e.g. VALID/INVALID).
   * The reply may come back JSON-quoted (`"VALID"`).
   */
  choices?: string[];
  /**
   * JSON Schema the answer must follow, for structured replies. The reply is
   * JSON text to parse. Ignored when `choices` is set.
   */
  responseSchema?: object;
};

export type AIProvider = {
  generate: (params: GenerateParams) => Promise<string>;
};

/**
 * - `unsupported`: this browser has no built-in AI (not Chrome, or too old)
 * - `unsupported_device`: Chrome has it, but this computer can't run the
 *   model (graphics card, memory or disk space)
 * - `download_failed`: the one-time model download didn't finish (usually
 *   disk space or connection)
 * - `request_failed`: anything else went wrong
 */
export type AIProviderErrorCode =
  "unsupported" | "unsupported_device" | "download_failed" | "request_failed";

/**
 * Error thrown by the AI provider so the UI can show a message based on
 * `code` instead of parsing browser errors.
 */
export class AIProviderError extends Error {
  readonly code: AIProviderErrorCode;

  constructor(code: AIProviderErrorCode, message: string) {
    super(message);
    this.name = "AIProviderError";
    this.code = code;
  }
}
