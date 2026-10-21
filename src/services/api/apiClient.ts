/** A successful response from the backend, always with a body to read */
export type ApiResponse = Response & {
  body: NonNullable<Response["body"]>;
};

/** The JSON body the backend answers with when a request fails */
export type ApiErrorBody = {
  /** What went wrong, e.g. `limit`, `not_configured` or `upstream` */
  error: string;
  /** The status of the service behind the backend (Google), if it failed */
  upstreamStatus?: number;
  /** Why that service failed, e.g. `PERMISSION_DENIED` */
  reason?: string;
};

/** A request to the app's backend that failed */
export class ApiError extends Error {
  /** The HTTP status, or `null` when the request never reached the server */
  readonly status: number | null;
  /** The backend's error, or `null` when it sent none (e.g. a network error) */
  readonly body: ApiErrorBody | null;

  constructor(
    status: number | null,
    body: ApiErrorBody | null,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/** Reads the error the backend sent, if the body is one */
const readErrorBody = async (
  response: Response,
): Promise<ApiErrorBody | null> => {
  const body = (await response.json().catch(() => null)) as unknown;
  return typeof body === "object" &&
    body !== null &&
    typeof (body as ApiErrorBody).error === "string"
    ? (body as ApiErrorBody)
    : null;
};

/**
 * Sends a JSON `POST` request to the app's backend. The only place in the
 * app that calls `fetch`, so every endpoint fails the same way.
 *
 * @returns The successful response; the caller reads it as JSON or a stream.
 * @throws {ApiError} When the network fails or the server answers with an
 * error; it holds the status and the error the server sent.
 */
export const postJson = async (
  url: string,
  body: object,
): Promise<ApiResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }).catch((error: unknown) => {
    throw new ApiError(null, null, `${url} could not be reached.`, {
      cause: error,
    });
  });

  if (!response.ok || !response.body) {
    const body = await readErrorBody(response);
    const details = body ? `: ${JSON.stringify(body)}` : "";
    throw new ApiError(
      response.status,
      body,
      `${url} failed (${response.status})${details}`,
    );
  }
  return response as ApiResponse;
};
