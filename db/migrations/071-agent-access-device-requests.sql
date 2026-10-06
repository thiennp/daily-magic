-- RFC 8628 device-authorization for agent-access (S1).
-- Hash-only device_code / user_code at rest on the request row.
-- One-time plaintext delivery is wiped on first successful token poll.
-- Additive expiry/revoke/refresh columns: existing non-expiring tokens stay valid.

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
);

CREATE INDEX IF NOT EXISTS agent_access_device_requests_status_expires_idx
  ON agent_access_device_requests (status, expires_at)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS agent_access_device_requests_user_code_hash_idx
  ON agent_access_device_requests (user_code_hash);

CREATE TABLE IF NOT EXISTS agent_access_device_token_delivery (
  device_request_id TEXT PRIMARY KEY
    REFERENCES agent_access_device_requests(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ;

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS refresh_token_hash TEXT;

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS refresh_expires_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS agent_access_tokens_refresh_token_hash_uidx
  ON agent_access_tokens (refresh_token_hash)
  WHERE refresh_token_hash IS NOT NULL;
