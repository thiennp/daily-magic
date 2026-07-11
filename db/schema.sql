CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMPTZ,
  image TEXT,
  global_role TEXT NOT NULL DEFAULT 'user' CHECK (global_role IN ('super_admin', 'admin', 'user')),
  agent_dispatch_policy TEXT CHECK (agent_dispatch_policy IN ('open', 'approval')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  PRIMARY KEY (provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  session_token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  dispatch_policy TEXT NOT NULL DEFAULT 'approval'
    CHECK (dispatch_policy IN ('open', 'approval')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_memberships (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('group_super_admin', 'group_admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS users_one_super_admin
  ON users (global_role)
  WHERE global_role = 'super_admin';

CREATE UNIQUE INDEX IF NOT EXISTS group_memberships_one_super_admin
  ON group_memberships (group_id)
  WHERE role = 'group_super_admin';

CREATE TABLE IF NOT EXISTS agent_witch_devices (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  device_label TEXT,
  dispatch_policy TEXT CHECK (dispatch_policy IN ('open', 'approval')),
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS agent_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('pending_approval', 'running', 'completed', 'failed', 'denied')
  ),
  dispatch_policy TEXT NOT NULL CHECK (dispatch_policy IN ('open', 'approval')),
  result_output TEXT,
  result_exit_code INTEGER,
  denial_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_runs_requester_idx
  ON agent_runs (requester_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_executor_idx
  ON agent_runs (executor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_witch_devices_user_id_idx
  ON agent_witch_devices (user_id);

CREATE INDEX IF NOT EXISTS agent_witch_devices_active_user_idx
  ON agent_witch_devices (user_id)
  WHERE revoked_at IS NULL;
