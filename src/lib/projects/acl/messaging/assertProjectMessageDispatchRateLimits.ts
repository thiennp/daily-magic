import { computeHourlyDispatchRetryAfter } from "@/lib/projects/acl/messaging/computeHourlyDispatchRetryAfter";
import { loadOldestCountedHourlyDispatchAt } from "@/lib/projects/acl/messaging/loadOldestCountedHourlyDispatchAt";
import {
  PROJECT_MESSAGE_HOURLY_CAP,
  PROJECT_MESSAGE_LIFECYCLE_KINDS,
  PROJECT_MESSAGE_UNREAD_CAP,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageRateLimitFailure = {
  readonly ok: false;
  /** Unified code for bots; reason keeps the specific limit. */
  readonly code: "rate_limited";
  readonly reason: "hourly" | "unread_cap";
  /** Kept for owner UI / HTTP mapping. */
  readonly detail: "rate_limited_hourly" | "unread_cap";
  /** Seconds until a slot frees; null when only ack/Clear frees slots. */
  readonly retryAfterSeconds: number | null;
  /** ISO time when a slot frees; null with unread_cap. */
  readonly retryAfterAt: string | null;
  /** Tell your user this sentence. */
  readonly message: string;
};

export type ProjectMessageRateLimitResult =
  { readonly ok: true } | ProjectMessageRateLimitFailure;

const unreadCapFailure = (): ProjectMessageRateLimitFailure => ({
  ok: false,
  code: "rate_limited",
  reason: "unread_cap",
  detail: "unread_cap",
  retryAfterSeconds: null,
  retryAfterAt: null,
  message:
    "Project message rate-limited: max unread reached. Tell your user the message was not sent. Ack or Clear all frees slots; there is no clock-based retry.",
});

/**
 * Dispatch path caps (no 60/day; messaging tools skip agent-access mutate bucket):
 * 1) per-sender rolling 1h user/owner dispatches (lifecycle kinds excluded)
 * 2) project-wide unread = COUNT of not-archived project_messages rows
 *    (delete-on-ack; Clear all archives, which frees unread slots)
 *
 * Failures always use code "rate_limited" with a reason and retry-after fields
 * so the sending bot can tell its user when to retry.
 */
export const assertProjectMessageDispatchRateLimits = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
  readonly now?: Date;
}): Promise<ProjectMessageRateLimitResult> => {
  const sql = getSql();
  const now = input.now ?? new Date();
  const lifecycleKinds = [...PROJECT_MESSAGE_LIFECYCLE_KINDS];

  const hourlyRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE (
          sender_membership_id = ${input.senderMembershipId}
          OR (
            sender_membership_id IS NULL
            AND sender_user_id = ${input.senderUserId}
          )
        )
        AND NOT (kind = ANY(${lifecycleKinds}::text[]))
        AND created_at > NOW() - INTERVAL '1 hour'
    `,
  );
  const hourlyCount = Number(hourlyRows[0]?.c ?? 0);
  if (hourlyCount >= PROJECT_MESSAGE_HOURLY_CAP) {
    const oldest = await loadOldestCountedHourlyDispatchAt({
      senderMembershipId: input.senderMembershipId,
      senderUserId: input.senderUserId,
    });
    const retry =
      oldest === null
        ? { retryAfterSeconds: 0, retryAfterAt: now.toISOString() }
        : computeHourlyDispatchRetryAfter({ oldestCreatedAt: oldest, now });
    return {
      ok: false,
      code: "rate_limited",
      reason: "hourly",
      detail: "rate_limited_hourly",
      retryAfterSeconds: retry.retryAfterSeconds,
      retryAfterAt: retry.retryAfterAt,
      message: `Project message rate-limited (hourly). Tell your user the message was not sent. Retry after ${retry.retryAfterSeconds}s (at ${retry.retryAfterAt}).`,
    };
  }

  const unreadRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE project_id = ${input.projectId}
        AND archived_at IS NULL
    `,
  );
  const unreadCount = Number(unreadRows[0]?.c ?? 0);
  if (unreadCount >= PROJECT_MESSAGE_UNREAD_CAP) {
    return unreadCapFailure();
  }

  return { ok: true };
};
