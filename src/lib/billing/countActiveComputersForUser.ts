import { asRowArray, getSql } from "@/lib/db";

/** Active (non-revoked) computers for entitlement checks. */
export const countActiveComputersForUser = async (
  userId: string,
): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS n
      FROM agent_witch_devices
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
    `,
  );
  return Number(rows[0]?.n ?? 0) || 0;
};
