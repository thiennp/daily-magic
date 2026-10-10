-- A skill version is checked after its 2nd, 3rd, 5th, 8th, 13th, 21st use, then
-- every 21 uses, and early on after a failed run. One row per check: queued as
-- 'due', then filled in by the judge (verdict, note, proposed better version).
CREATE TABLE IF NOT EXISTS project_skill_checks (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  skill_version INTEGER NOT NULL CHECK (skill_version > 0),
  uses_at_check INTEGER NOT NULL CHECK (uses_at_check > 0),
  last_use_id BIGINT NOT NULL,
  trigger TEXT NOT NULL CHECK (trigger IN ('checkpoint', 'failure')),
  status TEXT NOT NULL DEFAULT 'due' CHECK (status IN ('due', 'judged', 'failed')),
  verdict TEXT CHECK (verdict IS NULL OR verdict IN ('fine', 'improve')),
  note TEXT,
  proposed_body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  judged_at TIMESTAMPTZ,
  UNIQUE (project_id, skill_id, skill_version, uses_at_check)
);

CREATE INDEX IF NOT EXISTS project_skill_checks_due_idx
  ON project_skill_checks (project_id, status, created_at);
