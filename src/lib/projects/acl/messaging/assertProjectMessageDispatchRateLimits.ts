import {
  PROJECT_MESSAGE_HOURLY_CAP,
  PROJECT_MESSAGE_LIFECYCLE_KINDS,
  PROJECT_MESSAGE_UNREAD_CAP,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageRateLimitResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "rate_limited_hourly" | "unread_cap";
    };

/**
 * Dispatch path caps (no 60/day; messaging tools skip agent-access mutate bucket):
 * 1) per-sender rolling 1h user/owner dispatches (lifecycle kinds excluded)
 * 2) project-wide unread = COUNT of project_messages rows (delete-on-ack)
 */
export const assertProjectMessageDispatchRateLimits = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
}): Promise<ProjectMessageRateLimitResult> => {
  const sql = getSql();
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
    return { ok: false, code: "rate_limited_hourly" };
  }

  const unreadRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE project_id = ${input.projectId}
    `,
  );
  const unreadCount = Number(unreadRows[0]?.c ?? 0);
  if (unreadCount >= PROJECT_MESSAGE_UNREAD_CAP) {
    return { ok: false, code: "unread_cap" };
  }

  return { ok: true };
};
