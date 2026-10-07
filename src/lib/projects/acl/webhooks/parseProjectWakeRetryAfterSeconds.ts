import {
  PROJECT_WAKE_DEFAULT_RETRY_AFTER_SECONDS,
  PROJECT_WAKE_MAX_RETRY_AFTER_SECONDS,
} from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

const fromHeader = (value: string | null, nowMs: number): number | null => {
  if (value === null) {
    return null;
  }
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }
  const at = Date.parse(trimmed);
  return Number.isNaN(at) ? null : (at - nowMs) / 1000;
};

const fromBody = (text: string | null): number | null => {
  if (text === null || text.length === 0) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    const value = (parsed as { retryAfterSeconds?: unknown }).retryAfterSeconds;
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
};

/**
 * Seconds to wait after a 429. Retry-After header (seconds or HTTP date) wins,
 * then a JSON body retryAfterSeconds, else the default. Clamped to [1, max].
 */
export const parseProjectWakeRetryAfterSeconds = (input: {
  readonly retryAfterHeader: string | null;
  readonly bodyText: string | null;
  readonly nowMs: number;
}): number => {
  const raw =
    fromHeader(input.retryAfterHeader, input.nowMs) ?? fromBody(input.bodyText);
  if (raw === null || !Number.isFinite(raw)) {
    return PROJECT_WAKE_DEFAULT_RETRY_AFTER_SECONDS;
  }
  return Math.min(
    PROJECT_WAKE_MAX_RETRY_AFTER_SECONDS,
    Math.max(1, Math.ceil(raw)),
  );
};
