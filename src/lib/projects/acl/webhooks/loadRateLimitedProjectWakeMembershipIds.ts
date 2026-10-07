import { asRowArray, getSql } from "@/lib/db";
import { projectWakeRetryAfterRegistry } from "@/lib/projects/acl/webhooks/projectWakeRetryAfterRegistry";
import { PROJECT_WAKE_DEFAULT_RETRY_AFTER_SECONDS } from "@/lib/projects/acl/webhooks/projectWakeThrottle.constant";

/**
 * Recipients whose Grok wake endpoint answered 429 and must not be POSTed yet.
 * Deferred while this instance's remembered Retry-After is active, or while the
 * latest real POST stored for the membership is http_429 within the default
 * cooldown (covers other server instances). Waiting longer than Retry-After is
 * fine; waking earlier is not.
 */
export const loadRateLimitedProjectWakeMembershipIds = async (input: {
  readonly membershipIds: readonly string[];
  readonly nowMs: number;
}): Promise<ReadonlySet<string>> => {
  if (input.membershipIds.length === 0) {
    return new Set();
  }
  const inMemory = input.membershipIds.filter((membershipId) =>
    projectWakeRetryAfterRegistry.isDeferred({
      channel: "grok",
      membershipId,
      nowMs: input.nowMs,
    }),
  );
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT DISTINCT ON (a.membership_id)
        a.membership_id AS rate_limited_membership_id,
        a.result AS latest_post_result
      FROM project_grok_routine_wake_attempts a
      WHERE a.membership_id = ANY(${[...input.membershipIds]}::text[])
        AND a.result ~ '^(http_[0-9]{3}|fetch_failed)$'
        AND a.created_at >= NOW() - make_interval(secs => ${PROJECT_WAKE_DEFAULT_RETRY_AFTER_SECONDS})
      ORDER BY a.membership_id, a.created_at DESC
    `,
  );
  const stored = rows.flatMap((row) =>
    typeof row.rate_limited_membership_id === "string" &&
    row.latest_post_result === "http_429"
      ? [row.rate_limited_membership_id]
      : [],
  );
  return new Set([...inMemory, ...stored]);
};
