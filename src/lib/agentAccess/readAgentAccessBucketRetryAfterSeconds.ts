import { asRowArray, getSql } from "@/lib/db";

import { AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS } from "@/lib/agentAccess/agentAccess.constant";

/** Used when the oldest attempt cannot be read (DB hiccup or empty bucket). */
export const AGENT_ACCESS_RETRY_AFTER_FALLBACK_SECONDS = 60;

const toMillis = (value: unknown): number | null => {
  if (value instanceof Date) {
    return value.getTime();
  }
  if (typeof value === "string" && value.length > 0) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

/**
 * Seconds until the oldest attempt in the rolling window expires, which frees
 * one slot in the bucket. Clamped to [1, window]. Never throws.
 */
export const readAgentAccessBucketRetryAfterSeconds = async (input: {
  readonly subjectHash: string;
  readonly bucket: string;
  readonly nowMs?: number;
}): Promise<number> => {
  const nowMs = input.nowMs ?? Date.now();
  const windowMs = AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS * 1000;
  try {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT MIN(created_at) AS oldest_at
        FROM agent_access_api_attempts
        WHERE subject_hash = ${input.subjectHash}
          AND bucket = ${input.bucket}
          AND created_at > ${new Date(nowMs - windowMs).toISOString()}
      `,
    );
    const oldestMs = toMillis(rows[0]?.oldest_at);
    if (oldestMs === null) {
      return AGENT_ACCESS_RETRY_AFTER_FALLBACK_SECONDS;
    }
    const seconds = Math.ceil((oldestMs + windowMs - nowMs) / 1000);
    return Math.min(
      AGENT_ACCESS_RATE_LIMIT_WINDOW_SECONDS,
      Math.max(1, seconds),
    );
  } catch {
    return AGENT_ACCESS_RETRY_AFTER_FALLBACK_SECONDS;
  }
};
