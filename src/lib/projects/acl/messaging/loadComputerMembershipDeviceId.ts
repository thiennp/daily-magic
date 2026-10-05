import { asRowArray, getSql } from "@/lib/db";

/**
 * Reads device_id for a computer membership (Mac mig 068).
 * Returns null when the column is absent, null on the row, or the query fails —
 * bot resolve never calls this, so pre-Mac tip stays healthy.
 */
export const loadComputerMembershipDeviceId = async (
  membershipId: string,
): Promise<string | null> => {
  try {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT device_id
        FROM project_memberships
        WHERE id = ${membershipId}
          AND member_kind = 'computer'
          AND status = 'active'
        LIMIT 1
      `,
    );
    const deviceId = rows[0]?.device_id;
    return deviceId ? String(deviceId) : null;
  } catch {
    return null;
  }
};
