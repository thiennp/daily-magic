import { asRowArray, getSql } from "@/lib/db";

/** 108: invites the invitee accepted that still wait for the owner's Approve. */
export const selectAwaitingApprovalHumanInviteRows = async (
  projectId: string,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT *
      FROM project_human_invites
      WHERE project_id = ${projectId}
        AND status = 'accepted'
        AND revoked_at IS NULL
      ORDER BY accepted_at DESC NULLS LAST
      LIMIT 100
    `,
  );
};
