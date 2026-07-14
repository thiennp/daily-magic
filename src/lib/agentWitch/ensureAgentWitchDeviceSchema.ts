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
    schemaEnsureState.ensured = true;
  })();

  return schemaEnsureState.promise;
};

export const resetAgentWitchDeviceSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};
