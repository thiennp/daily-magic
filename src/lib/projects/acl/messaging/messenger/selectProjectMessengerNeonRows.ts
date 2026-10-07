import { asRowArray, getSql } from "@/lib/db";
import type { ProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";

/**
 * Project-wide project_messages window (newest first) for the Neon thread
 * page: sender/recipient seat kinds + names, archive meta (migration 098;
 * archiver seat name by user id, first human seat), exact cursor time.
 * Keyset: (created_at, id) older than `before` (exclusive).
 */
export const selectProjectMessengerNeonRows = async (input: {
  readonly projectId: string;
  readonly before: ProjectMessengerCursor | null;
  readonly fetchLimit: number;
}): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT m.id, m.kind, m.summary, m.created_at,
        m.sender_membership_id, m.sender_user_id,
        m.to_membership_id, m.to_user_id, m.to_team_label,
        sender.project_display_name AS sender_display_name,
        sender.member_kind AS sender_member_kind,
        recipient.member_kind AS recipient_member_kind,
        recipient.project_display_name AS recipient_display_name,
        m.archived_at, m.archived_by,
        CASE WHEN m.archived_by IS NULL THEN NULL ELSE (
          SELECT archiver.project_display_name
          FROM project_memberships archiver
          WHERE archiver.project_id = m.project_id
            AND archiver.user_id = m.archived_by
            AND archiver.member_kind = 'human'
          ORDER BY archiver.created_at ASC
          LIMIT 1
        ) END AS archived_by_display_name,
        to_char(m.created_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at
      FROM project_messages m
      LEFT JOIN project_memberships sender ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
        AND (${input.before?.t ?? null}::timestamptz IS NULL
          OR (m.created_at, m.id) < (
            ${input.before?.t ?? null}::timestamptz,
            ${input.before?.id ?? null}::text
          ))
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ${input.fetchLimit}::int
    `,
  );
};
