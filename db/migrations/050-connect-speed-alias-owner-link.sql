-- Connect-speed: display-name rename aliases (TTL) + optional agent→human owner link.

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS owner_user_id TEXT REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_access_tokens_owner_user_id_idx
  ON agent_access_tokens (owner_user_id)
  WHERE owner_user_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS project_membership_display_name_aliases (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  display_name_key TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_membership_display_name_aliases_lookup_idx
  ON project_membership_display_name_aliases (project_id, display_name_key, expires_at);

CREATE INDEX IF NOT EXISTS project_membership_display_name_aliases_membership_idx
  ON project_membership_display_name_aliases (membership_id, expires_at DESC);
