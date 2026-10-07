-- DF-025: human invites sent by email (Members → Email → Send invite).
-- Extends 062/064 project_human_invites in place (no new table).
-- Neon stores metadata only: normalized email, token HASH, timestamps, status.
-- No email subject/body, no plaintext token, no invite URL is ever stored.
--
-- status FSA: pending → accepted (invitee accepted, waiting for owner Approve)
--             pending → approved (no approval needed: the owner's own invite)
--             accepted → approved (owner Approve) | revoked (owner Deny)
--             pending → revoked (owner Cancel) | expired (lazy, past expires_at)
-- requires_approval: per-invite owner choice; default false keeps every
-- existing link invite on its current one-click path. Email invites default
-- to true in the UI so nobody joins without an explicit owner Approve.

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS delivery TEXT NOT NULL DEFAULT 'link';

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS requires_approval BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS accepted_by_user_id TEXT
  REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS accepted_display_name TEXT;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS decided_by_user_id TEXT
  REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Backfill status for pre-108 rows from the 062 timestamps.
UPDATE project_human_invites
SET status = CASE
  WHEN revoked_at IS NOT NULL THEN 'revoked'
  WHEN redeemed_at IS NOT NULL OR uses_remaining <= 0 THEN 'approved'
  WHEN expires_at <= NOW() THEN 'expired'
  ELSE 'pending'
END
WHERE status = 'pending';

-- 062 already lowercased on write; normalize defensively before the CHECK.
UPDATE project_human_invites
SET email = lower(trim(email))
WHERE email IS NOT NULL AND email <> lower(trim(email));

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_status_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_status_check
  CHECK (status IN ('pending', 'accepted', 'approved', 'revoked', 'expired'));

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_delivery_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_delivery_check
  CHECK (delivery IN ('link', 'email'));

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_email_delivery_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_email_delivery_check
  CHECK (delivery <> 'email' OR email IS NOT NULL);

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_email_lowercase_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_email_lowercase_check
  CHECK (email IS NULL OR email = lower(email));

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_accepted_by_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_accepted_by_check
  CHECK (status <> 'accepted' OR accepted_at IS NOT NULL);

-- Dedupe: one open email invite per (project, email). Expired pending rows
-- are flipped to 'expired' before insert, so they never block a re-invite.
CREATE UNIQUE INDEX IF NOT EXISTS project_human_invites_open_email_unique_idx
  ON project_human_invites (project_id, email)
  WHERE delivery = 'email' AND status IN ('pending', 'accepted');

-- One "Wants to join" row per person per project.
CREATE UNIQUE INDEX IF NOT EXISTS project_human_invites_accepted_user_unique_idx
  ON project_human_invites (project_id, accepted_by_user_id)
  WHERE status = 'accepted';

-- Rate-limit window lookup (email sends per project, recent first).
CREATE INDEX IF NOT EXISTS project_human_invites_email_created_idx
  ON project_human_invites (project_id, created_at DESC)
  WHERE delivery = 'email';
