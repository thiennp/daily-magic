import { getSql } from "@/lib/db";
import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const resetDeviceCodeSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};

export const ensureDeviceCodeSchema = async (): Promise<void> => {
  if (schemaEnsureState.ensured) {
    return;
  }

  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }

  schemaEnsureState.promise = (async () => {
    await ensureAgentAccessSchema();
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_device_requests (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        device_code_hash TEXT NOT NULL UNIQUE,
        user_code_hash TEXT NOT NULL UNIQUE,
        client_name TEXT,
        display_name TEXT,
        terms_version TEXT NOT NULL,
        status TEXT NOT NULL CHECK (
          status IN ('pending', 'approved', 'denied', 'expired', 'consumed')
        ),
        owner_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        token_id TEXT REFERENCES agent_access_tokens(id) ON DELETE SET NULL,
        interval_seconds INT NOT NULL DEFAULT 5,
        last_poll_at TIMESTAMPTZ,
        slow_down_until TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        decided_at TIMESTAMPTZ,
        consumed_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_access_device_requests_status_expires_idx
      ON agent_access_device_requests (status, expires_at)
      WHERE status = 'pending'
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_access_device_requests_user_code_hash_idx
      ON agent_access_device_requests (user_code_hash)
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_device_token_delivery (
        device_request_id TEXT PRIMARY KEY
          REFERENCES agent_access_device_requests(id) ON DELETE CASCADE,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      ALTER TABLE agent_access_tokens
      ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ
    `;
    await sql`
      ALTER TABLE agent_access_tokens
      ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ
    `;
    await sql`
      ALTER TABLE agent_access_tokens
      ADD COLUMN IF NOT EXISTS refresh_token_hash TEXT
    `;
    await sql`
      ALTER TABLE agent_access_tokens
      ADD COLUMN IF NOT EXISTS refresh_expires_at TIMESTAMPTZ
    `;
    schemaEnsureState.ensured = true;
  })();

  return schemaEnsureState.promise;
};
