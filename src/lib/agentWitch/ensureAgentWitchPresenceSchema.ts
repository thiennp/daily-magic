import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const ensureAgentWitchPresenceSchema = async (): Promise<void> => {
  if (schemaEnsureState.ensured) {
    return;
  }

  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }

  schemaEnsureState.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_witch_connections (
        client_id TEXT PRIMARY KEY,
        device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        instance_id TEXT NOT NULL,
        connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_ack_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_witch_connections_user_idx
        ON agent_witch_connections (user_id)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_witch_connections_instance_idx
        ON agent_witch_connections (instance_id)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_witch_connections_device_idx
        ON agent_witch_connections (device_id)
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_witch_dispatch_outbox (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
        idempotency_key TEXT NOT NULL UNIQUE,
        message_type TEXT NOT NULL,
        payload JSONB NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('queued', 'delivered', 'expired', 'cancelled')),
        attempts INTEGER NOT NULL DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        delivered_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_witch_dispatch_outbox_device_status_idx
        ON agent_witch_dispatch_outbox (device_id, status)
    `;
    schemaEnsureState.ensured = true;
  })();

  return schemaEnsureState.promise;
};

export const resetAgentWitchPresenceSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};
