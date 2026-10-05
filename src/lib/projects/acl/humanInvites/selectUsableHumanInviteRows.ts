import { asRowArray, getSql } from "@/lib/db";

/**
 * Owner list SELECT: unused (never accepted), unexpired, unrevoked.
 * Claim/accept path does not apply the never-redeemed fragment.
 */
export const selectUsableHumanInviteRows = async (
  projectId: string,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT *
      FROM project_human_invites
      WHERE project_id = ${projectId}
        AND revoked_at IS NULL
        AND expires_at > NOW()
        AND uses_remaining > 0
        AND uses_remaining = max_uses
      ORDER BY created_at DESC
      LIMIT 100
    `,
  );
};
