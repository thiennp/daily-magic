-- Restore durable agent runs + append-only event stream for multi-replica dispatch.

CREATE TABLE IF NOT EXISTS agent_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
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
  writer_agent TEXT NOT NULL DEFAULT 'claude-cli',
  result_output TEXT,
  result_exit_code INTEGER,
  denial_reason TEXT,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  capability_version_id TEXT REFERENCES capability_versions(id) ON DELETE SET NULL,
  approval_expires_at TIMESTAMPTZ,
  lease_expires_at TIMESTAMPTZ,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS agent_runs_requester_idx
  ON agent_runs (requester_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_executor_idx
  ON agent_runs (executor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_capability_idx
  ON agent_runs (capability_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_runs_device_claim_idx
  ON agent_runs (device_id, status, created_at ASC)
  WHERE status = 'running';

CREATE TABLE IF NOT EXISTS agent_run_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_run_id TEXT NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  seq INTEGER NOT NULL,
  kind TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agent_run_id, seq)
);

CREATE INDEX IF NOT EXISTS agent_run_events_run_idx
  ON agent_run_events (agent_run_id, seq ASC);

ALTER TABLE capability_feedback
  DROP CONSTRAINT IF EXISTS capability_feedback_agent_run_id_fkey;

ALTER TABLE capability_feedback
  ADD CONSTRAINT capability_feedback_agent_run_id_fkey
  FOREIGN KEY (agent_run_id) REFERENCES agent_runs(id) ON DELETE CASCADE;
