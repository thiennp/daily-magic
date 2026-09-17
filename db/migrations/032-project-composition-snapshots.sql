-- P5: immutable composition snapshots per dispatch + run attribution.

CREATE TABLE IF NOT EXISTS project_composition_snapshots (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  resolved JSONB NOT NULL,
  digest TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_composition_snapshots_project_idx
  ON project_composition_snapshots (project_id, created_at DESC);

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS composition_snapshot_id TEXT
    REFERENCES project_composition_snapshots(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_runs_composition_snapshot_idx
  ON agent_runs (composition_snapshot_id)
  WHERE composition_snapshot_id IS NOT NULL;
