import { asRowArray, getSql } from "@/lib/db";

/**
 * One guarded SELECT: only unused, unexpired, unrevoked invites for a project.
 * WHERE matches claimProjectInviteToken. Never filters in JS after the fetch.
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
      ORDER BY created_at DESC
      LIMIT 100
    `,
  );
};
