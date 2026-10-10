-- One row per skill an assistant's run relied on: the skill assigned to the
-- task, and any skill it fetched just before claiming. Skill version and the
-- run's outcome let the app judge a skill after its 2nd, 3rd, 5th, 8th... use.
-- Meta only: no task text, only a hash of the failure reason.
CREATE TABLE IF NOT EXISTS project_skill_uses (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  skill_version INTEGER NOT NULL CHECK (skill_version > 0),
  task_id TEXT NOT NULL,
  fence INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('assigned', 'lookup')),
  used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  outcome TEXT CHECK (outcome IS NULL OR outcome IN ('done', 'failed', 'blocked', 'released')),
  reason_fingerprint TEXT,
  released_at TIMESTAMPTZ,
  UNIQUE (task_id, fence, skill_id)
);

CREATE INDEX IF NOT EXISTS project_skill_uses_skill_idx
  ON project_skill_uses (project_id, skill_id, skill_version, used_at);
