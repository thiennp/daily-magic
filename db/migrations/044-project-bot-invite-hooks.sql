-- Project bot invites, scoped project API keys, agent display names (RFC A1–A10 + §11).
-- Redeem → pending until owner Approve + projectDisplayName (UI contract 2026-10-02).

ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS project_display_name TEXT NULL;

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_status_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_status_check
  CHECK (status IN ('active', 'revoked', 'naming_required'));

-- Unique project-local display name among active/naming-complete agent rows (case-insensitive).
CREATE UNIQUE INDEX IF NOT EXISTS project_memberships_display_name_active_idx
  ON project_memberships (project_id, lower(trim(project_display_name)))
  WHERE status IN ('active', 'naming_required')
    AND project_display_name IS NOT NULL
    AND length(trim(project_display_name)) > 0;

ALTER TABLE project_access_requests
  ADD COLUMN IF NOT EXISTS invite_id TEXT NULL;

ALTER TABLE project_access_requests
  ADD COLUMN IF NOT EXISTS team_label TEXT NULL;

CREATE TABLE IF NOT EXISTS project_invites (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  team_label TEXT,
  scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  max_uses INTEGER NOT NULL DEFAULT 1 CHECK (max_uses >= 1 AND max_uses <= 10),
  uses_remaining INTEGER NOT NULL DEFAULT 1 CHECK (uses_remaining >= 0 AND uses_remaining <= 10),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_invites_project_created_idx
  ON project_invites (project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS project_api_keys (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  token_prefix TEXT NOT NULL,
  token_last4 TEXT NOT NULL,
  scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS project_api_keys_membership_idx
  ON project_api_keys (membership_id, revoked_at);

CREATE INDEX IF NOT EXISTS project_api_keys_project_idx
  ON project_api_keys (project_id, revoked_at);

ALTER TABLE project_access_audit
  DROP CONSTRAINT IF EXISTS project_access_audit_action_check;

ALTER TABLE project_access_audit
  ADD CONSTRAINT project_access_audit_action_check
  CHECK (action IN (
    'request',
    'approve',
    'deny',
    'revoke',
    'add_folder_ref',
    'remove_folder_ref',
    'allow_claim_ok',
    'allow_claim_deny',
    'membership_check_ok',
    'membership_check_deny',
    'invite.create',
    'invite.revoke',
    'invite.redeem',
    'key.mint',
    'key.rotate',
    'key.revoke',
    'webhook.register',
    'webhook.update',
    'webhook.disable',
    'msg.dispatch',
    'msg.ack',
    'membership.set_display_name',
    'membership.rename_display'
  ));

ALTER TABLE project_access_requests
  DROP CONSTRAINT IF EXISTS project_access_requests_invite_id_fkey;

ALTER TABLE project_access_requests
  ADD CONSTRAINT project_access_requests_invite_id_fkey
  FOREIGN KEY (invite_id) REFERENCES project_invites(id) ON DELETE SET NULL;
