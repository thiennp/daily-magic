import { asRowArray, getSql } from "@/lib/db";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import type { ProjectMessageLogEntry } from "@/lib/projects/acl/messaging/projectMessageLog.types";
import { PROJECT_COMPUTER_HISTORY_BACKLOG_LIMIT } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

/**
 * Project messages the project computer has not acked yet, oldest first.
 * Lets the computer catch up after being offline; an empty list means the
 * backlog is acked (degraded → on_ready).
 */
export const listProjectComputerHistoryBacklog = async (input: {
  readonly projectId: string;
  readonly limit?: number;
}): Promise<readonly ProjectMessageLogEntry[]> => {
  const limit = Math.min(
    Math.max(input.limit ?? PROJECT_COMPUTER_HISTORY_BACKLOG_LIMIT, 1),
    PROJECT_COMPUTER_HISTORY_BACKLOG_LIMIT,
  );
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.*,
        sender.project_display_name AS sender_display_name,
        recipient.project_display_name AS recipient_display_name
      FROM project_messages m
      LEFT JOIN project_memberships sender ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
        AND NOT EXISTS (
          SELECT 1 FROM project_message_computer_acks a
          WHERE a.project_id = m.project_id AND a.message_id = m.id
        )
      ORDER BY m.created_at ASC
      LIMIT ${limit}
    `,
  );
  return rows.map(mapProjectMessageLogRow);
};
