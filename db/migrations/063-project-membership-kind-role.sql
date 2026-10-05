-- Distinguish human vs bot seats; allow viewer role for human invites.
-- Existing memberships are agent-redeem bots → backfill member_kind = 'bot'.
-- Ambiguous rows also default to 'bot' so no seat becomes a viewer by accident.

ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS member_kind TEXT;

UPDATE project_memberships
SET member_kind = 'bot'
WHERE member_kind IS NULL;

ALTER TABLE project_memberships
  ALTER COLUMN member_kind SET DEFAULT 'bot';

ALTER TABLE project_memberships
  ALTER COLUMN member_kind SET NOT NULL;

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_member_kind_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_member_kind_check
  CHECK (member_kind IN ('human', 'bot'));

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_role_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_role_check
  CHECK (role IN ('owner', 'member', 'viewer'));

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_viewer_is_human_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_viewer_is_human_check
  CHECK (role <> 'viewer' OR member_kind = 'human');
