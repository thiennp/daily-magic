import { asRowArray, getSql } from "@/lib/db";

/**
 * Prune exemption (LOCKED Q3): need an owner-enabled sync device that has
 * synced once. Falls back to any active computer seat when no sync rows yet
 * (pre-toggle projects during rollout).
 */
export const projectHasSyncedComputerForPrune = async (
  projectId: string,
): Promise<boolean> => {
  const sql = getSql();
  const enabled = asRowArray(
    await sql`
      SELECT 1 AS found FROM project_sync_devices
      WHERE project_id = ${projectId}
        AND enabled = true
        AND synced_once = true
      LIMIT 1
    `,
  );
  if (enabled.length > 0) {
    return true;
  }
  const anySync = asRowArray(
    await sql`
      SELECT 1 AS found FROM project_sync_devices
      WHERE project_id = ${projectId}
      LIMIT 1
    `,
  );
  if (anySync.length > 0) {
    return false;
  }
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
