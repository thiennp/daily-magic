import { asRowArray, getSql } from "@/lib/db";

export type ProjectMessengerParentRow = {
  readonly senderMembershipId: string | null;
  readonly senderMemberKind: string | null;
  readonly senderUserId: string;
};

/** The message a bot replies to, within the project. Null when gone (ack / TTL). */
export const loadProjectMessengerParentRow = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<ProjectMessengerParentRow | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.sender_membership_id, m.sender_user_id, sender.member_kind
      FROM project_messages m
      LEFT JOIN project_memberships sender ON sender.id = m.sender_membership_id
      WHERE m.id = ${input.messageId}
        AND m.project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return null;
  }
  return {
    senderMembershipId: row.sender_membership_id
      ? String(row.sender_membership_id)
      : null,
    senderMemberKind: row.member_kind ? String(row.member_kind) : null,
    senderUserId: String(row.sender_user_id),
  };
};
