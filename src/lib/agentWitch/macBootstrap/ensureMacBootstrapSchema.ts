import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const resetMacBootstrapSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};

export const ensureMacBootstrapSchema = async (): Promise<void> => {
  if (schemaEnsureState.ensured) {
    return;
  }
  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }
  schemaEnsureState.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_witch_mac_bootstrap_codes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        code_hash TEXT NOT NULL UNIQUE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        state TEXT NOT NULL,
        code_challenge TEXT NOT NULL,
        code_challenge_method TEXT NOT NULL CHECK (code_challenge_method = 'S256'),
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        consumed_at TIMESTAMPTZ
      )
    `;
    schemaEnsureState.ensured = true;
  })();
  return schemaEnsureState.promise;
};
