import {
  PROJECT_MESSAGE_DISPATCH_HOURLY_LIMIT,
  PROJECT_MESSAGE_DISPATCH_UNACKED_LIMIT,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessageRateLimitResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "rate_limited_hourly" | "rate_limited_unacked";
    };

export const assertProjectMessageDispatchRateLimits = async (input: {
  readonly senderMembershipId: string;
}): Promise<ProjectMessageRateLimitResult> => {
  const sql = getSql();
  const hourlyRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE sender_membership_id = ${input.senderMembershipId}
        AND created_at > NOW() - INTERVAL '1 hour'
    `,
  );
  const hourlyCount = Number(hourlyRows[0]?.c ?? 0);
  if (hourlyCount >= PROJECT_MESSAGE_DISPATCH_HOURLY_LIMIT) {
    return { ok: false, code: "rate_limited_hourly" };
  }

  const unackedRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS c
      FROM project_messages
      WHERE sender_membership_id = ${input.senderMembershipId}
        AND acked_at IS NULL
    `,
  );
  const unackedCount = Number(unackedRows[0]?.c ?? 0);
  if (unackedCount >= PROJECT_MESSAGE_DISPATCH_UNACKED_LIMIT) {
    return { ok: false, code: "rate_limited_unacked" };
  }

  return { ok: true };
};
