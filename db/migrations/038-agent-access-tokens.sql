CREATE TABLE IF NOT EXISTS agent_access_tokens (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  token_prefix TEXT NOT NULL,
  registration_method TEXT NOT NULL CHECK (registration_method IN ('none', 'agentmail')),
  agentmail_inbox TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS agent_access_registration_attempts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_access_registration_attempts_ip_idx
  ON agent_access_registration_attempts (ip_hash, created_at DESC);
