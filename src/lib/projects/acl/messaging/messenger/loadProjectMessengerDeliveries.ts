import { asRowArray, getSql } from "@/lib/db";
import type { ProjectMessengerDelivery } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Live delivery rows of a project's messages, newest message first. */
export const loadProjectMessengerDeliveries = async (
  projectId: string,
): Promise<readonly ProjectMessengerDelivery[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT d.message_id, d.membership_id, d.b2b_state
      FROM project_message_deliveries d
      JOIN project_messages m ON m.id = d.message_id
      WHERE m.project_id = ${projectId}
      ORDER BY m.created_at DESC, m.id DESC
    `,
  );
  return rows.map((row) => ({
    messageId: String(row.message_id),
    membershipId: String(row.membership_id),
    b2bState: typeof row.b2b_state === "string" ? row.b2b_state : null,
  }));
};
