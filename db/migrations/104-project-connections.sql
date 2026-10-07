-- Project Connections (P1): per-project OAuth binds for Slack/Linear/Gmail/GitHub.
-- Migration 104: 101 = cost-control on main; 102 Neon prune + 103 computer-sync RESERVED on parked tips.

CREATE TABLE IF NOT EXISTS project_connections (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  provider TEXT NOT NULL
    CHECK (provider IN ('slack', 'linear', 'gmail', 'github')),
  status TEXT NOT NULL DEFAULT 'none'
    CHECK (status IN ('none', 'connecting', 'connected', 'expired', 'error', 'revoked')),
  external_account_id TEXT,
  account_label TEXT,
  scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  access_token_ciphertext TEXT,
  access_token_iv TEXT,
  refresh_token_ciphertext TEXT,
  refresh_token_iv TEXT,
  token_expires_at TIMESTAMPTZ,
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  connected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- v1: one active bind per provider for the Settings row (reconnect replaces).
  -- external_account_id kept for label/revoke; multi-account deferred.
  UNIQUE (project_id, provider)
);

CREATE INDEX IF NOT EXISTS project_connections_project_idx
  ON project_connections (project_id);

CREATE INDEX IF NOT EXISTS project_connections_project_provider_status_idx
  ON project_connections (project_id, provider, status);
