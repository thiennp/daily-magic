import { asRowArray, getSql } from "@/lib/db";

export async function userHasPairedMacInDatabase(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT EXISTS (
        SELECT 1
        FROM agent_witch_devices
        WHERE user_id = ${userId}
          AND revoked_at IS NULL
      ) AS mac_paired
    `,
  );

  return result[0]?.mac_paired === true;
}
