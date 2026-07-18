import { asRowArray, getSql } from "@/lib/db";

export const requestAgentWitchDeviceRestart = async (
  deviceId: string,
): Promise<boolean> => {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET restart_requested_at = NOW()
      WHERE id = ${deviceId}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  return result.length > 0;
};

export const isAgentWitchDeviceRestartRequested = async (
  deviceId: string,
): Promise<boolean> => {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT restart_requested_at
      FROM agent_witch_devices
      WHERE id = ${deviceId}
        AND revoked_at IS NULL
      LIMIT 1
    `,
  );

  const row = result[0];
  if (row === undefined) {
    return false;
  }

  return row.restart_requested_at !== null;
};

export const acknowledgeAgentWitchDeviceRestart = async (
  deviceId: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET restart_requested_at = NULL
    WHERE id = ${deviceId}
      AND revoked_at IS NULL
  `;
};
