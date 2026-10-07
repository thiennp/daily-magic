import { parseProjectWakeRetryAfterSeconds } from "@/lib/projects/acl/webhooks/parseProjectWakeRetryAfterSeconds";

const MAX_BODY_CHARS = 2_000;

type RetryAfterResponse = {
  readonly headers?: { readonly get?: (name: string) => string | null };
  readonly text?: () => Promise<string>;
};

/** Retry-After seconds from a 429 response. Never throws. */
export const readProjectWakeRetryAfterSeconds = async (
  response: RetryAfterResponse,
): Promise<number> => {
  const header = response.headers?.get?.("retry-after") ?? null;
  const bodyText =
    header === null && typeof response.text === "function"
      ? await response.text().then(
          (text) => text.slice(0, MAX_BODY_CHARS),
          () => null,
        )
      : null;
  return parseProjectWakeRetryAfterSeconds({
    retryAfterHeader: header,
    bodyText,
    nowMs: Date.now(),
  });
};
