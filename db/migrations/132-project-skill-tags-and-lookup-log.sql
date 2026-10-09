-- Skill tags (front matter keywords/tags of the latest saved body) and a
-- metadata-only log of bot skill lookups (counts and ids, never query text).
-- Idempotent; mirrored by ensureProjectSkillShareSchema.ts (which also fills
-- tags for rows saved before this column: NULL = not scanned).
ALTER TABLE project_skills ADD COLUMN IF NOT EXISTS tags TEXT[];

CREATE TABLE IF NOT EXISTS project_skill_lookup_log (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  actor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tool TEXT NOT NULL CHECK (tool IN ('list', 'get')),
  had_query BOOLEAN NOT NULL DEFAULT FALSE,
  query_chars INTEGER NOT NULL DEFAULT 0,
  returned INTEGER NOT NULL DEFAULT 0,
  total INTEGER,
  response_tokens INTEGER NOT NULL DEFAULT 0,
  top_ids TEXT[] NOT NULL DEFAULT '{}',
  skill_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_skill_lookup_log_project_idx
  ON project_skill_lookup_log (project_id, created_at DESC);
