import { asRowArray, getSql } from "@/lib/db";

const isAgentWitchDeviceOwnedByUser = async (
  deviceId: string,
  userId: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM agent_witch_devices
      WHERE id = ${deviceId}
        AND user_id = ${userId}
        AND revoked_at IS NULL
      LIMIT 1
    `,
  );

  return rows.length > 0;
};

export default isAgentWitchDeviceOwnedByUser;
