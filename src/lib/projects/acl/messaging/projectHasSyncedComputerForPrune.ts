import { asRowArray, getSql } from "@/lib/db";

/**
 * Prune exemption (LOCKED Q3): no active computer seat → never trim Neon.
 * Tip 2 (sync relay) tightens this to owner-enabled + synced_once devices.
 */
export const projectHasSyncedComputerForPrune = async (
  projectId: string,
): Promise<boolean> => {
  const sql = getSql();
  const seats = asRowArray(
    await sql`
      SELECT 1 AS found FROM project_memberships
      WHERE project_id = ${projectId}
        AND member_kind = 'computer'
        AND status = 'active'
        AND device_id IS NOT NULL
      LIMIT 1
    `,
  );
  return seats.length > 0;
};
