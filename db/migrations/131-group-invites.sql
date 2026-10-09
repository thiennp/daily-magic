-- A company owner or admin invites an existing user; nobody becomes a member (and so a dispatch
-- target of that company's policy) until they accept.
CREATE TABLE IF NOT EXISTS group_invites (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  invitee_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('group_admin', 'user')),
  invited_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS group_invites_one_pending
  ON group_invites (group_id, invitee_user_id)
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS group_invites_invitee_idx
  ON group_invites (invitee_user_id, status);
