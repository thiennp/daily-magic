import { getSql } from "@/lib/db";

/** 61e9c49e: remember which install this device row belongs to. */
export const updateAgentWitchDeviceInstallId = async (input: {
  readonly deviceId: string;
  readonly installId: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET install_id = ${input.installId}
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
      AND install_id IS DISTINCT FROM ${input.installId}
  `;
};
