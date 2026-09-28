ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS estimate_seconds INTEGER;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS actual_seconds INTEGER;
