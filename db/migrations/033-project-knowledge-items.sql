-- P6: cloud knowledge item metadata (bodies stay on device until promotion).

CREATE TABLE IF NOT EXISTS project_knowledge_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  source_run_id TEXT REFERENCES agent_runs(id) ON DELETE SET NULL,
  kind TEXT NOT NULL CHECK (kind IN ('lesson', 'fact', 'decision')),
  body TEXT,
  sync_state TEXT NOT NULL DEFAULT 'local'
    CHECK (sync_state IN ('local', 'shared')),
  status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (status IN ('candidate', 'accepted', 'rejected', 'promoted')),
  promoted_component_version_id TEXT
    REFERENCES component_versions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_knowledge_items_project_status_idx
  ON project_knowledge_items (project_id, status, created_at DESC);
