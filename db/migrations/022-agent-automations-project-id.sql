ALTER TABLE agent_automations
  ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES user_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_automations_project_idx
  ON agent_automations (project_id)
  WHERE project_id IS NOT NULL;
