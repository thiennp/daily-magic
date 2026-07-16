-- Published agents/workflows per owner (Phase 1 capabilities catalog)

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
  DROP CONSTRAINT IF EXISTS published_capabilities_current_version_fkey;

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
