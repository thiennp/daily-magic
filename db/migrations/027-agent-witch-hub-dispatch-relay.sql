CREATE TABLE IF NOT EXISTS agent_witch_hub_dispatch_relay (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_instance_id TEXT NOT NULL,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  request_id TEXT NOT NULL,
  body JSONB NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'processing', 'completed', 'failed', 'expired')
  ),
  result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_witch_hub_dispatch_relay_owner_status_idx
  ON agent_witch_hub_dispatch_relay (owner_instance_id, status);
