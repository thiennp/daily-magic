import { getSql } from "@/lib/db";

export const updateAgentWitchDevicePublicKey = async (input: {
  readonly deviceId: string;
  readonly publicKey: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET
      public_key = ${input.publicKey},
      last_handshake_at = NOW()
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
  `;
};

export const updateAgentWitchDevicePreferredWriter = async (input: {
  readonly deviceId: string;
  readonly preferredWriter: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET preferred_writer = ${input.preferredWriter}
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
  `;
};

export const updateAgentWitchDeviceWakeError = async (input: {
  readonly deviceId: string;
  readonly wakeError: string | null;
}): Promise<void> => {
  const sql = getSql();
  if (input.wakeError === null || input.wakeError.length === 0) {
    await sql`
      UPDATE agent_witch_devices
      SET last_wake_error = NULL, last_wake_error_at = NULL
      WHERE id = ${input.deviceId}
    `;
    return;
  }

  await sql`
    UPDATE agent_witch_devices
    SET
      last_wake_error = ${input.wakeError},
      last_wake_error_at = NOW()
    WHERE id = ${input.deviceId}
  `;
};
