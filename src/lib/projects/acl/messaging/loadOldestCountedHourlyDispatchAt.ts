import { PROJECT_MESSAGE_LIFECYCLE_KINDS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { asRowArray, getSql } from "@/lib/db";

/** Oldest user/owner dispatch from this sender still inside the rolling 1h window. */
export const loadOldestCountedHourlyDispatchAt = async (input: {
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
}): Promise<Date | null> => {
  const sql = getSql();
  const lifecycleKinds = [...PROJECT_MESSAGE_LIFECYCLE_KINDS];
  const rows = asRowArray(
    await sql`
      SELECT MIN(created_at) AS oldest
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
  const oldest = rows[0]?.oldest;
  if (oldest instanceof Date) {
    return oldest;
  }
  if (typeof oldest === "string" && oldest.length > 0) {
    return new Date(oldest);
  }
  return null;
};
