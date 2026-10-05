import { asRowArray, getSql } from "@/lib/db";

/**
 * One guarded SELECT for the owner invite list: unused (never redeemed),
 * unexpired, unrevoked. Shared claim fragments plus list-only
 * uses_remaining = max_uses. Claim/redeem path is unchanged (multi-use OK).
 */
export const selectUsableProjectInviteRows = async (
  projectId: string,
): Promise<readonly Record<string, unknown>[]> => {
  const sql = getSql();
  return asRowArray(
    await sql`
      SELECT *
      FROM project_invites
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
