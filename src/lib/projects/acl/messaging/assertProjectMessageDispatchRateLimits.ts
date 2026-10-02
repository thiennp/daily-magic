import {
  PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT,
  PROJECT_MESSAGE_LIFECYCLE_KINDS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageRateLimitResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "rate_limited_daily" };

/** Daily cap for user/owner dispatches only — lifecycle kinds (peer.joined/left) excluded. */
export const assertProjectMessageDispatchRateLimits = async (input: {
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
}): Promise<ProjectMessageRateLimitResult> => {
  const sql = getSql();
  const lifecycleKinds = [...PROJECT_MESSAGE_LIFECYCLE_KINDS];
  const dailyRows = asRowArray(
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
        AND created_at > NOW() - INTERVAL '24 hours'
    `,
  );
  const dailyCount = Number(dailyRows[0]?.c ?? 0);
  if (dailyCount >= PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT) {
    return { ok: false, code: "rate_limited_daily" };
  }

  return { ok: true };
};
