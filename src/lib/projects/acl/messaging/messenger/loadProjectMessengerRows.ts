import { asRowArray, getSql } from "@/lib/db";
import { mapProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerRow";
import { PROJECT_MESSENGER_ROW_LIMIT } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * Live project_messages rows of a project, oldest first, with sender and
 * recipient seat kinds. Bounded by the project unread cap. Rows removed by
 * ack / delete-on-read / TTL are gone (thin retention; see README).
 */
export const loadProjectMessengerRows = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<readonly ProjectMessengerRow[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.id, m.kind, m.summary, m.created_at,
        m.sender_membership_id, m.sender_user_id,
        m.to_membership_id, m.to_user_id, m.to_team_label,
        sender.project_display_name AS sender_display_name,
        sender.member_kind AS sender_member_kind,
        recipient.member_kind AS recipient_member_kind,
        recipient.project_display_name AS recipient_display_name
      FROM project_messages m
      LEFT JOIN project_memberships sender ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ${PROJECT_MESSENGER_ROW_LIMIT}
    `,
  );
  return rows
    .map((row) => mapProjectMessengerRow(row, input.ownerUserId))
    .reverse();
};
