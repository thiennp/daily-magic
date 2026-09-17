-- Official workflow orchestration (server-driven step graph)

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  template_id TEXT NOT NULL,
  orchestration_version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (
    status IN (
      'running',
      'waiting_human',
      'completed',
      'failed',
      'cancelled'
    )
  ),
  current_step_index INTEGER NOT NULL DEFAULT 0,
  field_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  step_outputs JSONB NOT NULL DEFAULT '{}'::jsonb,
  definition_snapshot JSONB NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS workflow_runs_requester_idx
  ON workflow_runs (requester_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS workflow_step_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  workflow_run_id TEXT NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  step_index INTEGER NOT NULL,
  node_id TEXT NOT NULL,
  node_kind TEXT NOT NULL CHECK (node_kind IN ('human', 'agent')),
  status TEXT NOT NULL CHECK (
    status IN (
      'pending',
      'running',
      'waiting_human',
      'completed',
      'failed',
      'skipped'
    )
  ),
  title TEXT NOT NULL,
  agent_run_id TEXT REFERENCES agent_runs(id) ON DELETE SET NULL,
  output JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE (workflow_run_id, step_index)
);

CREATE INDEX IF NOT EXISTS workflow_step_runs_workflow_idx
  ON workflow_step_runs (workflow_run_id, step_index ASC);

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS workflow_run_id TEXT REFERENCES workflow_runs(id) ON DELETE SET NULL;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS workflow_step_run_id TEXT REFERENCES workflow_step_runs(id) ON DELETE SET NULL;
