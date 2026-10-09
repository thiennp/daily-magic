import { asRowArray, getSql } from "@/lib/db";

/**
 * 108: invites the invitee accepted that still wait for the owner's Approve,
 * with the accepter's verified account email (owner-only list; F1).
 */
export const selectAwaitingApprovalHumanInviteRows = async (
  projectId: string,
  /** A member sees only the invites they created; the owner passes null. */
  createdByUserId: string | null = null,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT i.*,
        CASE WHEN u.email_verified IS NOT NULL THEN lower(u.email) END
          AS accepted_by_email
      FROM project_human_invites i
      LEFT JOIN users u ON u.id = i.accepted_by_user_id
      WHERE i.project_id = ${projectId}
        AND i.status = 'accepted'
        AND i.revoked_at IS NULL
        AND (${createdByUserId}::text IS NULL
          OR i.created_by_user_id = ${createdByUserId})
      ORDER BY i.accepted_at DESC NULLS LAST
      LIMIT 100
    `,
  );
};
