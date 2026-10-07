-- DF-024 / AWD-7: stand-alone project task records (bots + humans), listed in
-- the Tasks tab next to agent runs. NOT agent_runs: never claimed, never swept,
-- never counted as a computer run.
-- Migration 109 (107/108 = AW Invite).
-- Neon rule: meta only. title ≤120, description ≤200 chars; full bodies stay
-- local (project computer / IDB). No body / prompt column on purpose.
-- plan_item_id: task started from a planned item (tasks-planned brief).
-- started_at / blocked_at / done_at + stage_times {stage: iso}: step times.
-- Per-project row cap (500) is enforced in app code (task_cap_reached).

CREATE TABLE IF NOT EXISTS project_task_records (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_by_membership_id TEXT
    REFERENCES project_memberships(id) ON DELETE SET NULL,
  owner_membership_id TEXT
    REFERENCES project_memberships(id) ON DELETE SET NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
  description TEXT
    CHECK (description IS NULL OR char_length(description) <= 200),
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'planned', 'in_progress', 'blocked', 'done')),
  priority TEXT
    CHECK (priority IS NULL OR priority IN ('p0', 'p1', 'p2', 'p3')),
  stage TEXT
    CHECK (stage IS NULL OR stage IN ('design', 'en', 'build', 'ready', 'live')),
  tip_sha TEXT
    CHECK (tip_sha IS NULL OR tip_sha ~ '^[0-9a-f]{7,40}$'),
  depends_on TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[]
    CHECK (cardinality(depends_on) <= 10),
  plan_item_id TEXT
    REFERENCES project_task_records(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ,
  blocked_at TIMESTAMPTZ,
  done_at TIMESTAMPTZ,
  stage_times JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_task_records_project_created_idx
  ON project_task_records (project_id, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS project_task_records_plan_item_idx
  ON project_task_records (plan_item_id) WHERE plan_item_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS project_task_records_creator_created_idx
  ON project_task_records (created_by_user_id, created_at DESC);
