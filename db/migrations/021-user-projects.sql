CREATE TABLE IF NOT EXISTS user_projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  folder_path TEXT NOT NULL,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_projects_owner_idx
  ON user_projects (owner_user_id, last_used_at DESC NULLS LAST, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_name_idx
  ON user_projects (owner_user_id, lower(name));
