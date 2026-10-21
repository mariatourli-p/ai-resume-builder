/**
 * Vercel serverless function behind `POST /api/generate`: sends one AI
 * request to Google's Gemini API and returns the reply.
 *
 * It exists so the API key stays on the server. The browser calls this
 * endpoint, never Google directly. The key (`GEMINI_API_KEY`) and,
 * optionally, the model (`GEMINI_MODEL`) are set in the Vercel project's
 * environment variables.
 *
 * - Only the app's own prompts are accepted, so nobody can use the endpoint
 *   (and the key's free quota) as a general-purpose AI.
 * - Each visitor gets a few requests per minute, so one person can't use up
 *   the daily quota for everyone.
 * - Nothing is stored: the text goes to Google, the reply comes back, and
 *   both are forgotten. When Google fails, only its status and reason (e.g.
 *   `403 PERMISSION_DENIED`) are logged and returned, never the user's text.
 */
import {
  ACHIEVEMENTS_VALIDATION_PROMPT,
  AI_PROMPTS,
  JOB_TITLE_PROMPT,
  VOLUNTEER_AREA_PROMPT,
} from "../src/services/aiPrompts.js";
import type { ApiErrorBody } from "../src/services/api/apiClient.js";
import type { GenerateRequest } from "../src/services/api/generateApi.js";

/**
 * Google's alias for its newest Flash model (free tier), so the app keeps
 * working when Google retires a model. Set `GEMINI_MODEL` to pin one.
 */
const DEFAULT_MODEL = "gemini-flash-latest";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";

/** The only system prompts this endpoint runs */
const ALLOWED_PROMPTS = new Set<string>([
  ...Object.values(AI_PROMPTS),
  JOB_TITLE_PROMPT,
  VOLUNTEER_AREA_PROMPT,
  ACHIEVEMENTS_VALIDATION_PROMPT,
]);

/** Longest text accepted: a title, notes or a few bullets fit easily */
const MAX_TEXT_LENGTH = 4000;

/**
 * Requests per visitor (IP address) per window. One AI click makes up to
 * three requests, so this allows about seven clicks a minute.
 */
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

/**
 * Request times per IP address. Kept in memory, so the limit is per server
 * instance and resets when Vercel starts a new one: enough to stop one
 * visitor from using up the quota, without a database.
 */
const requestTimes = new Map<string, number[]>();

const json = (
  body: { text: string } | ApiErrorBody,
  status: number,
  headers?: Record<string, string>,
) => Response.json(body, { status, headers });

/**
 * Why Google failed, as Google names it (e.g. `PERMISSION_DENIED` for a
 * wrong key, `NOT_FOUND` for a renamed model). Its full message is left out:
 * it can name the Google Cloud project behind the key.
 */
const geminiErrorReason = async (response: Response): Promise<string> => {
  const reply = (await response.json().catch(() => null)) as {
    error?: { status?: string };
  } | null;
  return reply?.error?.status ?? "UNKNOWN";
};

/** Whether this IP may send another request now; records it if so */
const allowRequest = (ip: string): boolean => {
  const now = Date.now();
  const recent = (requestTimes.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  requestTimes.set(ip, recent);
  // Forget visitors from earlier windows so the map doesn't grow forever
  if (requestTimes.size > 10_000) {
    for (const [key, times] of requestTimes) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) {
        requestTimes.delete(key);
      }
    }
  }
  return true;
};

/** Checks the request body; returns `null` when it isn't a valid request */
const parseBody = (body: unknown): GenerateRequest | null => {
  if (typeof body !== "object" || body === null) return null;
  const { prompt, text, stream, choices, responseSchema } =
    body as Partial<GenerateRequest>;
  if (typeof prompt !== "string" || !ALLOWED_PROMPTS.has(prompt)) return null;
  if (typeof text !== "string" || text.length > MAX_TEXT_LENGTH) return null;
  if (
    choices !== undefined &&
    !(Array.isArray(choices) && choices.every((c) => typeof c === "string"))
  ) {
    return null;
  }
  if (responseSchema !== undefined && typeof responseSchema !== "object") {
    return null;
  }
  return { prompt, text, stream: stream === true, choices, responseSchema };
};

/**
 * The app's schemas are standard JSON Schema (`"type": "object"`), the
 * format Chrome's built-in AI takes. Gemini's `responseSchema` names the
 * types in capitals (`"OBJECT"`).
 */
const toGeminiSchema = (schema: unknown): unknown => {
  if (Array.isArray(schema)) return schema.map(toGeminiSchema);
  if (typeof schema !== "object" || schema === null) return schema;
  return Object.fromEntries(
    Object.entries(schema).map(([key, value]) => [
      key,
      key === "type" && typeof value === "string"
        ? value.toUpperCase()
        : toGeminiSchema(value),
    ]),
  );
};

/** Builds the Gemini request from the app's request */
const toGeminiRequest = ({
  prompt,
  text,
  choices,
  responseSchema,
}: GenerateRequest) => ({
  systemInstruction: { parts: [{ text: prompt }] },
  contents: [{ role: "user", parts: [{ text }] }],
  generationConfig: choices
    ? {
        // The reply is exactly one of the choices, as plain text
        responseMimeType: "text/x.enum",
        responseSchema: { type: "STRING", enum: choices },
      }
    : responseSchema
      ? {
          responseMimeType: "application/json",
          responseSchema: toGeminiSchema(responseSchema),
        }
      : undefined,
});

type GeminiReply = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

/** The text of one Gemini reply, or of one streamed piece of it */
const replyText = (reply: GeminiReply): string =>
  reply.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("") ?? "";

/**
 * Turns Gemini's stream (server-sent events, one JSON reply per `data:`
 * line) into plain text pieces, so the browser only appends what it reads.
 */
const toTextStream = (body: ReadableStream<Uint8Array>) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const sendLines = (
    lines: string[],
    controller: TransformStreamDefaultController<Uint8Array>,
  ) => {
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const piece = replyText(JSON.parse(line.slice(5)) as GeminiReply);
      if (piece) controller.enqueue(encoder.encode(piece));
    }
  };

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split(/\r?\n/);
        // The last line may be incomplete; keep it for the next chunk
        buffer = lines.pop() ?? "";
        sendLines(lines, controller);
      },
      flush(controller) {
        sendLines([buffer], controller);
      },
    }),
  );
};

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "not_configured" }, 503);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allowRequest(ip)) {
    return json({ error: "limit" }, 429, { "Retry-After": "60" });
  }

  const body = parseBody(await request.json().catch(() => null));
  if (!body) return json({ error: "bad_request" }, 400);

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const method = body.stream
    ? "streamGenerateContent?alt=sse"
    : "generateContent";
  const gemini = await fetch(`${GEMINI_URL}/${model}:${method}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify(toGeminiRequest(body)),
  }).catch((error: unknown) => {
    console.error("[generate] Gemini could not be reached:", String(error));
    return null;
  });

  if (!gemini) {
    return json({ error: "upstream", reason: "UNREACHABLE" }, 502);
  }
  if (!gemini.ok || !gemini.body) {
    const reason = await geminiErrorReason(gemini);
    console.error(`[generate] Gemini failed: ${gemini.status} ${reason}`);
    const details = { upstreamStatus: gemini.status, reason };
    // Google's free quota is used up: the browser falls back to Chrome's AI
    if (gemini.status === 429) {
      return json({ error: "limit", ...details }, 429, { "Retry-After": "60" });
    }
    return json({ error: "upstream", ...details }, 502);
  }

  if (body.stream) {
    return new Response(toTextStream(gemini.body), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  const text = replyText((await gemini.json()) as GeminiReply);
  return json({ text }, 200, { "cache-control": "no-store" });
}
