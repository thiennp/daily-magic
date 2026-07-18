import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const ensureAgentWitchDeviceSchema = async (): Promise<void> => {
  if (schemaEnsureState.ensured) {
    return;
  }

  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }

  schemaEnsureState.promise = (async () => {
    const sql = getSql();
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS display_name TEXT
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS restart_requested_at TIMESTAMPTZ
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS public_key TEXT
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS last_handshake_at TIMESTAMPTZ
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS preferred_writer TEXT
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS last_wake_error TEXT
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS last_wake_error_at TIMESTAMPTZ
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS link_code TEXT
    `;
    schemaEnsureState.ensured = true;
  })();

  return schemaEnsureState.promise;
};

export const resetAgentWitchDeviceSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};
