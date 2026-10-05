-- Human project invites (slice S0). Hash only; plaintext returned once.
-- Invite FSA: pending → accepted | revoked | expired. v1 single-use (max_uses=1).
-- List hides after first accept (uses_remaining = max_uses), same pattern as bot invites.

CREATE TABLE IF NOT EXISTS project_human_invites (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('member', 'viewer')),
  max_uses INTEGER NOT NULL DEFAULT 1 CHECK (max_uses >= 1 AND max_uses <= 1),
  uses_remaining INTEGER NOT NULL DEFAULT 1 CHECK (uses_remaining >= 0 AND uses_remaining <= 1),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  redeemed_at TIMESTAMPTZ,
  redeemed_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_human_invites_project_created_idx
  ON project_human_invites (project_id, created_at DESC);

CREATE INDEX IF NOT EXISTS project_human_invites_pending_idx
  ON project_human_invites (project_id, created_at DESC)
  WHERE revoked_at IS NULL AND redeemed_at IS NULL;
