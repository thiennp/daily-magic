import { PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageRateLimitResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "rate_limited_daily" };

export const assertProjectMessageDispatchRateLimits = async (input: {
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
}): Promise<ProjectMessageRateLimitResult> => {
  const sql = getSql();
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
        AND created_at > NOW() - INTERVAL '24 hours'
    `,
  );
  const dailyCount = Number(dailyRows[0]?.c ?? 0);
  if (dailyCount >= PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT) {
    return { ok: false, code: "rate_limited_daily" };
  }

  return { ok: true };
};
