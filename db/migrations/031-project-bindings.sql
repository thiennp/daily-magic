-- P4: cloud project bindings (composition + per-device folder mirror).

CREATE TABLE IF NOT EXISTS project_device_bindings (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  folder_path TEXT,
  folder_verified_at TIMESTAMPTZ,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, device_id)
);

CREATE INDEX IF NOT EXISTS project_device_bindings_device_idx
  ON project_device_bindings (device_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS project_components (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('harness', 'workflow', 'agent')),
  channel TEXT NOT NULL DEFAULT 'pinned'
    CHECK (channel IN ('pinned', 'latest')),
  pinned_version_id TEXT REFERENCES component_versions(id) ON DELETE SET NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  materialize_target TEXT NOT NULL DEFAULT 'repo'
    CHECK (materialize_target IN ('repo', 'run_only')),
  removed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS project_components_active_project_component_idx
  ON project_components (project_id, component_id)
  WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS project_components_project_kind_idx
  ON project_components (project_id, kind)
  WHERE removed_at IS NULL AND enabled = true;

ALTER TABLE user_projects
  ALTER COLUMN folder_path DROP NOT NULL;

DROP INDEX IF EXISTS user_projects_owner_name_idx;

CREATE UNIQUE INDEX IF NOT EXISTS user_projects_owner_device_name_idx
  ON user_projects (owner_user_id, device_id, lower(name));

INSERT INTO project_device_bindings (
  project_id,
  device_id,
  folder_path,
  folder_verified_at,
  is_primary,
  created_at,
  updated_at
)
SELECT
  id,
  device_id,
  folder_path,
  updated_at,
  true,
  created_at,
  updated_at
FROM user_projects
WHERE device_id IS NOT NULL
ON CONFLICT (project_id, device_id) DO NOTHING;
