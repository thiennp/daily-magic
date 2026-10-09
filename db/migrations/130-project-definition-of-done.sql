-- Per-project "definition of done" the owner sets; bots read it in the briefing
-- and meet it before marking a task done (≤600 chars).
-- Idempotent; mirrored by ensureProjectDefinitionOfDoneSchema.ts.
CREATE TABLE IF NOT EXISTS project_definition_of_done (
  project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 600),
  updated_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
