-- Opt-in sharing of knowledge note text (project flag knowledgeShare=on on the
-- member's computer). Visible to project owners only. Idempotent; mirrored by
-- src/lib/knowledge/ensureProjectKnowledgeSchema.ts.

CREATE TABLE IF NOT EXISTS project_knowledge_cards (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  takeaway TEXT NOT NULL,
  files JSONB NOT NULL DEFAULT '[]'::jsonb,
  outcome TEXT NOT NULL,
  commit_sha TEXT,
  hits INTEGER NOT NULL DEFAULT 0,
  occurrences INTEGER NOT NULL DEFAULT 1,
  card_updated_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (project_id, device_id, card_id)
);

CREATE INDEX IF NOT EXISTS project_knowledge_cards_project_idx
  ON project_knowledge_cards (project_id, card_updated_at DESC);
