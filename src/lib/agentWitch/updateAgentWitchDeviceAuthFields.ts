import { asRowArray, getSql } from "@/lib/db";

export const getAgentWitchDevicePublicKey = async (input: {
  readonly deviceId: string;
}): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT public_key
      FROM agent_witch_devices
      WHERE id = ${input.deviceId}
        AND revoked_at IS NULL
      LIMIT 1
    `,
  );
  const raw = rows[0]?.public_key;
  if (typeof raw !== "string") {
    return null;
  }
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const clearAgentWitchDevicePublicKey = async (input: {
  readonly deviceId: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET public_key = NULL
    WHERE id = ${input.deviceId}
  `;
};

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
