import { getSql } from "@/lib/db";

export const updateAgentWitchDeviceWakePort = async (input: {
  readonly deviceId: string;
  readonly wakePort: number;
}): Promise<void> => {
  if (
    !Number.isInteger(input.wakePort) ||
    input.wakePort <= 0 ||
    input.wakePort > 65535
  ) {
    return;
  }

  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET wake_port = ${input.wakePort}
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
  `;
};
