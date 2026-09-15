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
);

CREATE INDEX IF NOT EXISTS agent_witch_dispatch_outbox_device_status_idx
  ON agent_witch_dispatch_outbox (device_id, status);
