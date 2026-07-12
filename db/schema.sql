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
  harness_sharing_visibility TEXT CHECK (
    harness_sharing_visibility IN ('private', 'group', 'public')
  ),
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
    status IN (
      'pending_approval',
      'running',
      'completed',
      'failed',
      'denied',
      'expired'
    )
  ),
  dispatch_policy TEXT NOT NULL CHECK (dispatch_policy IN ('open', 'approval')),
  result_output TEXT,
  result_exit_code INTEGER,
  denial_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  approval_expires_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_runs_requester_idx
  ON agent_runs (requester_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_executor_idx
  ON agent_runs (executor_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS harness_catalog_snapshots (
  owner_user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  visibility TEXT NOT NULL DEFAULT 'group'
    CHECK (visibility IN ('private', 'group', 'public')),
  hostname TEXT NOT NULL DEFAULT '',
  manifest_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS harness_catalog_snapshots_visibility_idx
  ON harness_catalog_snapshots (visibility, reported_at DESC);

CREATE TABLE IF NOT EXISTS harness_borrows (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  borrower_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS harness_borrows_borrower_idx
  ON harness_borrows (borrower_user_id, borrowed_at DESC);

CREATE TABLE IF NOT EXISTS harness_set_sharing (
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  set_slug TEXT NOT NULL,
  visibility TEXT NOT NULL CHECK (
    visibility IN ('inherit', 'private', 'group', 'public')
  ),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (owner_user_id, set_slug)
);

CREATE INDEX IF NOT EXISTS agent_witch_devices_user_id_idx
  ON agent_witch_devices (user_id);

CREATE INDEX IF NOT EXISTS agent_witch_devices_active_user_idx
  ON agent_witch_devices (user_id)
  WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS published_capabilities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('agent', 'workflow')),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  example_request TEXT NOT NULL DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'group'
    CHECK (visibility IN ('private', 'group', 'public')),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  dispatch_policy_override TEXT CHECK (
    dispatch_policy_override IN ('open', 'approval')
  ),
  harness_set_slug TEXT,
  current_version_id TEXT,
  workflow_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS published_capabilities_owner_idx
  ON published_capabilities (owner_user_id, status);

CREATE INDEX IF NOT EXISTS published_capabilities_group_idx
  ON published_capabilities (group_id, status, visibility);

CREATE TABLE IF NOT EXISTS capability_versions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  changelog TEXT NOT NULL DEFAULT '',
  harness_set_slug TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (capability_id, version_number)
);

ALTER TABLE published_capabilities
  ADD CONSTRAINT published_capabilities_current_version_fkey
  FOREIGN KEY (current_version_id) REFERENCES capability_versions(id)
  ON DELETE SET NULL;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS capability_id TEXT
    REFERENCES published_capabilities(id) ON DELETE SET NULL;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS capability_version_id TEXT
    REFERENCES capability_versions(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_runs_capability_idx
  ON agent_runs (capability_id, created_at DESC);

CREATE TABLE IF NOT EXISTS capability_feedback (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_run_id TEXT NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  reviewer_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'acknowledged', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agent_run_id, reviewer_user_id)
);

CREATE INDEX IF NOT EXISTS capability_feedback_owner_lookup_idx
  ON capability_feedback (capability_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS capability_feedback_reviewer_idx
  ON capability_feedback (reviewer_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS capability_improvements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  feedback_id TEXT REFERENCES capability_feedback(id) ON DELETE SET NULL,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  suggestion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed', 'accepted', 'rejected')),
  resulting_version_id TEXT REFERENCES capability_versions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capability_improvements_owner_idx
  ON capability_improvements (owner_user_id, status, created_at DESC);
