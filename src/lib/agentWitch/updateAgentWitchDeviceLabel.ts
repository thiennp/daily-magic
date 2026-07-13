import { asRowArray, getSql } from "@/lib/db";

export const updateAgentWitchDeviceLabel = async (
  deviceId: string,
  userId: string,
  deviceLabel: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET display_name = ${deviceLabel}
      WHERE id = ${deviceId}
        AND user_id = ${userId}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  return rows.length > 0;
};
