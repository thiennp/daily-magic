ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS public_key TEXT,
  ADD COLUMN IF NOT EXISTS last_handshake_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS preferred_writer TEXT,
  ADD COLUMN IF NOT EXISTS last_wake_error TEXT,
  ADD COLUMN IF NOT EXISTS last_wake_error_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS link_code TEXT;

CREATE INDEX IF NOT EXISTS agent_witch_devices_public_key_idx
  ON agent_witch_devices (public_key)
  WHERE public_key IS NOT NULL;
