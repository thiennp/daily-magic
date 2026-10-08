-- Auto skills (src/features/project-auto-skills): the owner's computer notices a
-- repeated kind of task and raises a question; the owner answers in the app.
-- Runtime twin: ensureProjectAutoSkillsSchema (CREATE TABLE IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS project_auto_skills (
  project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  judge_pref TEXT NOT NULL DEFAULT 'auto'
    CHECK (judge_pref IN ('auto', 'ollama', 'agent', 'bot')),
  publish_mode TEXT NOT NULL DEFAULT 'draft'
    CHECK (publish_mode IN ('draft', 'publish')),
  judge_kind TEXT,
  judge_label TEXT,
  paused_reason TEXT,
  status_note TEXT,
  last_checked_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_skill_suggestions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  cluster_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'saved', 'not_now', 'never')),
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  occurrences INTEGER NOT NULL DEFAULT 2,
  matches JSONB NOT NULL DEFAULT '[]'::jsonb,
  draft_name TEXT NOT NULL,
  draft_body TEXT NOT NULL,
  judge_label TEXT,
  skill_id TEXT,
  answered_by_user_id TEXT,
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, cluster_id)
);

CREATE INDEX IF NOT EXISTS project_skill_suggestions_project_status_idx
  ON project_skill_suggestions (project_id, status);
