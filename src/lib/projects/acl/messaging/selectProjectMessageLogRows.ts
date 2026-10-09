import { asRowArray, getSql } from "@/lib/db";

/**
 * One page of the project message log, newest first (limit + 1 rows so the caller sees if more
 * exist). Assistant-to-assistant rows are the owner's view only; a closed assistant's rows are
 * visible only to the person who invited it.
 */
export const selectProjectMessageLogRows = async (input: {
  readonly projectId: string;
  readonly viewerUserId: string;
  readonly viewerIsOwner: boolean;
  readonly archived: boolean;
  readonly since: string | null;
  readonly cursor: string | null;
  readonly limit: number;
}): Promise<readonly Record<string, unknown>[]> => {
  const { archived, since, cursor, limit } = input;
  return asRowArray(
    await getSql()`
      SELECT
        m.*,
        sender.project_display_name AS sender_display_name,
        recipient.project_display_name AS recipient_display_name
      FROM project_messages m
      LEFT JOIN project_memberships sender
        ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient
        ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
        AND (m.archived_at IS NOT NULL) = ${archived}::boolean
        -- assistant-to-assistant traffic is the owner's view only (same as the messenger)
        AND (
          ${input.viewerIsOwner}::boolean
          OR NOT (
            sender.member_kind = 'bot' AND recipient.member_kind = 'bot'
          )
        )
        -- a closed assistant's messages are visible only to the person who invited it
        AND (
          sender.closed_to_others IS NOT TRUE
          OR sender.invited_by_user_id IS NULL
          OR sender.invited_by_user_id = ${input.viewerUserId}
        )
        AND (
          recipient.closed_to_others IS NOT TRUE
          OR recipient.invited_by_user_id IS NULL
          OR recipient.invited_by_user_id = ${input.viewerUserId}
        )
        AND (${since}::timestamptz IS NULL OR m.created_at > ${since}::timestamptz)
        AND (
          ${cursor}::text IS NULL
          OR m.created_at < (
            SELECT c.created_at FROM project_messages c
            WHERE c.id = ${cursor} AND c.project_id = ${input.projectId}
          )
          OR (
            m.created_at = (
              SELECT c.created_at FROM project_messages c
              WHERE c.id = ${cursor} AND c.project_id = ${input.projectId}
            )
            AND m.id < ${cursor}
          )
        )
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ${limit + 1}
    `,
  );
};
