-- Two-way sync between project tasks and an external tracker (Linear first).
-- settings: one row per (project, provider); webhook secret is AES-GCM
--   encrypted like project_connections tokens.
-- external links: task <-> external issue; last_synced_hash is the loop guard
--   (hash of title/status/priority/description as last pushed or pulled).
-- Idempotent; mirrored by ensureTaskSyncSchema.ts.

CREATE TABLE IF NOT EXISTS project_task_sync_settings (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('linear')),
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  external_team_id TEXT,
  import_new BOOLEAN NOT NULL DEFAULT FALSE,
  webhook_id TEXT,
  webhook_secret_ciphertext TEXT,
  webhook_secret_iv TEXT,
  last_error TEXT,
  last_synced_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, provider)
);

CREATE TABLE IF NOT EXISTS project_task_external_links (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES project_task_records(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('linear')),
  external_id TEXT NOT NULL,
  external_identifier TEXT,
  external_url TEXT,
  last_synced_hash TEXT,
  last_synced_at TIMESTAMPTZ,
  UNIQUE (task_id, provider),
  UNIQUE (provider, external_id)
);

CREATE INDEX IF NOT EXISTS project_task_external_links_project_idx
  ON project_task_external_links (project_id, provider);
