import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const resetAgentAccessSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};

export const ensureAgentAccessSchema = async (): Promise<void> => {
  if (schemaEnsureState.ensured) {
    return;
  }

  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }

  schemaEnsureState.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_tokens (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL UNIQUE,
        token_prefix TEXT NOT NULL,
        registration_method TEXT NOT NULL CHECK (registration_method IN ('none', 'agentmail')),
        agentmail_inbox TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_used_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_registration_attempts (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        ip_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_access_registration_attempts_ip_idx
      ON agent_access_registration_attempts (ip_hash, created_at DESC)
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_api_attempts (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        subject_hash TEXT NOT NULL,
        bucket TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_access_api_attempts_subject_idx
      ON agent_access_api_attempts (subject_hash, bucket, created_at DESC)
    `;
    schemaEnsureState.ensured = true;
  })();

  return schemaEnsureState.promise;
};
