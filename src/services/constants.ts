// src/services/aiConfig.ts
export const AI_CONFIG = {
  model: "claude-haiku-4-5-20251001",
  maxTokens: 1024,
  apiVersion: "2023-06-01",
  baseUrl: "https://api.anthropic.com/v1/messages",
} as const;
