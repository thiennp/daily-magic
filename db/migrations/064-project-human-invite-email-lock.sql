-- Optional per-invite email lock for human project invites.
-- Mode A (default): any signed-in account with the link may join.
-- Mode B: require_email_match=true → accepting account email must match email.
-- Column `email` already exists (062); this adds the lock flag + CHECK.

ALTER TABLE project_human_invites
  ADD COLUMN IF NOT EXISTS require_email_match BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE project_human_invites
  DROP CONSTRAINT IF EXISTS project_human_invites_require_email_match_check;

ALTER TABLE project_human_invites
  ADD CONSTRAINT project_human_invites_require_email_match_check
  CHECK (NOT require_email_match OR email IS NOT NULL);
