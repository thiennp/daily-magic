-- Bot ownership claim codes (human claims a bot via short-lived single-use code).
-- Hash only; plaintext never stored. Issuing supersedes unused codes for that token.

CREATE TABLE IF NOT EXISTS agent_bot_claim_codes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  token_id TEXT NOT NULL REFERENCES agent_access_tokens(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  redeemed_at TIMESTAMPTZ,
  redeemed_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  superseded_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_bot_claim_codes_token_pending_idx
  ON agent_bot_claim_codes (token_id, created_at DESC)
  WHERE redeemed_at IS NULL AND superseded_at IS NULL AND revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS agent_bot_claim_entry_failures (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_bot_claim_entry_failures_user_idx
  ON agent_bot_claim_entry_failures (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS agent_bot_claim_entry_locks (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  locked_until TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
