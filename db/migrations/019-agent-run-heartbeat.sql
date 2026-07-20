-- Run-level liveness from Mac worker (run.heartbeat).

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS last_run_heartbeat_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS agent_runs_stale_running_idx
  ON agent_runs (status, last_run_heartbeat_at)
  WHERE status = 'running' AND last_run_heartbeat_at IS NOT NULL;
