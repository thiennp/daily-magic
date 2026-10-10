-- "Run both": while a comparison is running, assistants asking for the skill
-- get the old and the new version in turn (sticky for one actor for 20 minutes
-- so a single run never switches text), and their outcomes are compared.
CREATE TABLE IF NOT EXISTS project_skill_comparisons (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  old_version INTEGER NOT NULL CHECK (old_version > 0),
  new_version INTEGER NOT NULL CHECK (new_version > 0),
  check_id BIGINT,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'decided')),
  winner TEXT CHECK (winner IS NULL OR winner IN ('old', 'new')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decided_by_user_id TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS project_skill_comparisons_running_idx
  ON project_skill_comparisons (project_id, skill_id) WHERE status = 'running';

CREATE TABLE IF NOT EXISTS project_skill_serves (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  actor_user_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  comparison_id BIGINT NOT NULL REFERENCES project_skill_comparisons(id) ON DELETE CASCADE,
  served_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_skill_serves_actor_idx
  ON project_skill_serves (project_id, skill_id, actor_user_id, served_at DESC);
