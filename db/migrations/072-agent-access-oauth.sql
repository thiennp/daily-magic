-- Remote MCP OAuth 2.1 + PKCE (S2). Ownership bind only.
-- Client secrets and auth codes stored as hashes. Additive; no project grants.

CREATE TABLE IF NOT EXISTS agent_access_oauth_clients (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_id TEXT NOT NULL UNIQUE,
  client_secret_hash TEXT,
  client_name TEXT,
  redirect_uris TEXT[] NOT NULL,
  token_endpoint_auth_method TEXT NOT NULL DEFAULT 'client_secret_post',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agent_access_oauth_auth_codes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  code_hash TEXT NOT NULL UNIQUE,
  client_id TEXT NOT NULL REFERENCES agent_access_oauth_clients(client_id) ON DELETE CASCADE,
  redirect_uri TEXT NOT NULL,
  code_challenge TEXT NOT NULL,
  code_challenge_method TEXT NOT NULL CHECK (code_challenge_method = 'S256'),
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_id TEXT REFERENCES agent_access_tokens(id) ON DELETE SET NULL,
  terms_version TEXT NOT NULL,
  client_display_name TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_access_oauth_auth_codes_client_idx
  ON agent_access_oauth_auth_codes (client_id, created_at DESC);

CREATE TABLE IF NOT EXISTS agent_access_oauth_token_delivery (
  auth_code_id TEXT PRIMARY KEY
    REFERENCES agent_access_oauth_auth_codes(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pending authorize sessions (pre-consent), keyed by opaque state cookie/param.
CREATE TABLE IF NOT EXISTS agent_access_oauth_pending (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_id TEXT NOT NULL REFERENCES agent_access_oauth_clients(client_id) ON DELETE CASCADE,
  redirect_uri TEXT NOT NULL,
  code_challenge TEXT NOT NULL,
  code_challenge_method TEXT NOT NULL CHECK (code_challenge_method = 'S256'),
  state TEXT,
  client_display_name TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
