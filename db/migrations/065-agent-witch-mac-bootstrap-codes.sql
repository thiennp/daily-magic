-- Mac app first-run PKCE bootstrap codes (one-time, TTL ≤5m).
-- Store hash only; plaintext code never persisted. Bound to state + challenge + user.

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
);

CREATE INDEX IF NOT EXISTS agent_witch_mac_bootstrap_codes_user_pending_idx
  ON agent_witch_mac_bootstrap_codes (user_id, created_at DESC)
  WHERE consumed_at IS NULL;

CREATE INDEX IF NOT EXISTS agent_witch_mac_bootstrap_codes_expires_idx
  ON agent_witch_mac_bootstrap_codes (expires_at)
  WHERE consumed_at IS NULL;
