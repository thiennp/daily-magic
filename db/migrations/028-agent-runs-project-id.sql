-- Link interactive agent runs to user_projects (automations already have project_id).

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES user_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_runs_project_idx
  ON agent_runs (project_id, created_at DESC)
  WHERE project_id IS NOT NULL;
