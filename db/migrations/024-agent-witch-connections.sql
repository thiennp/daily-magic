CREATE TABLE IF NOT EXISTS agent_witch_connections (
  client_id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instance_id TEXT NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_ack_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_witch_connections_user_idx
  ON agent_witch_connections (user_id);

CREATE INDEX IF NOT EXISTS agent_witch_connections_instance_idx
  ON agent_witch_connections (instance_id);

CREATE INDEX IF NOT EXISTS agent_witch_connections_device_idx
  ON agent_witch_connections (device_id);
