-- Keyset paging for History Load older: agent_runs by project + (created_at, id).
-- Supports Neon merge of AI sessions into Whole-project messenger timeline.
-- Additive index only (existing agent_runs_project_idx kept). Soft Arch light later.

CREATE INDEX IF NOT EXISTS agent_runs_project_created_id_idx
  ON agent_runs (project_id, created_at DESC, id DESC)
  WHERE project_id IS NOT NULL;
