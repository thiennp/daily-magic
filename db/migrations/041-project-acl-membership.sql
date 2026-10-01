-- Multi-bot project cowork ACL: memberships, access requests, audit, folder refs.
-- AWC stores ONLY name/folder refs/members/approve+revoke audit for this feature.

CREATE TABLE IF NOT EXISTS project_memberships (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'member')),
  status TEXT NOT NULL CHECK (status IN ('active', 'revoked')),
  team_label TEXT,
  scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS project_memberships_project_user_active_idx
  ON project_memberships (project_id, user_id)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS project_memberships_user_status_idx
  ON project_memberships (user_id, status, created_at DESC);

CREATE TABLE IF NOT EXISTS project_access_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invited_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  reason TEXT,
  requested_scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'denied', 'expired')),
  decided_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '14 days')
);

CREATE UNIQUE INDEX IF NOT EXISTS project_access_requests_pending_unique_idx
  ON project_access_requests (project_id, requester_user_id)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS project_access_requests_project_status_idx
  ON project_access_requests (project_id, status, created_at DESC);

CREATE TABLE IF NOT EXISTS project_access_audit (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  actor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN (
    'request', 'approve', 'deny', 'revoke', 'add_folder_ref', 'remove_folder_ref'
  )),
  target_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  detail JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS project_access_audit_project_at_idx
  ON project_access_audit (project_id, at DESC);

CREATE TABLE IF NOT EXISTS project_folder_refs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  machine_or_device_ref TEXT NOT NULL,
  folder_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS project_folder_refs_unique_idx
  ON project_folder_refs (project_id, machine_or_device_ref, folder_path);

CREATE INDEX IF NOT EXISTS project_folder_refs_project_idx
  ON project_folder_refs (project_id, updated_at DESC);

-- Seed folder refs from existing device bindings (path strings only).
INSERT INTO project_folder_refs (
  project_id,
  machine_or_device_ref,
  folder_path,
  created_at,
  updated_at
)
SELECT
  project_id,
  device_id,
  folder_path,
  created_at,
  updated_at
FROM project_device_bindings
WHERE folder_path IS NOT NULL
  AND length(trim(folder_path)) > 0
ON CONFLICT DO NOTHING;
