-- Computer seats: project memberships that reference an AWL device.
-- member_kind gains 'computer'; device_id required iff computer.
-- Active computer seats are unique per (project_id, device_id).
-- Human/bot keep one active seat per (project_id, user_id); computers share
-- the device owner's user_id so that unique index excludes member_kind=computer.

ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS device_id TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'project_memberships_device_id_fkey'
  ) THEN
    ALTER TABLE project_memberships
      ADD CONSTRAINT project_memberships_device_id_fkey
      FOREIGN KEY (device_id)
      REFERENCES agent_witch_devices(id)
      ON DELETE CASCADE;
  END IF;
END $$;

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_member_kind_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_member_kind_check
  CHECK (member_kind IN ('human', 'bot', 'computer'));

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_computer_device_required_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_computer_device_required_check
  CHECK (member_kind <> 'computer' OR device_id IS NOT NULL);

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_computer_role_member_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_computer_role_member_check
  CHECK (member_kind <> 'computer' OR role = 'member');

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_non_computer_device_null_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_non_computer_device_null_check
  CHECK (member_kind = 'computer' OR device_id IS NULL);

DROP INDEX IF EXISTS project_memberships_project_user_active_idx;

CREATE UNIQUE INDEX project_memberships_project_user_active_idx
  ON project_memberships (project_id, user_id)
  WHERE status = 'active'
    AND member_kind IN ('human', 'bot');

CREATE UNIQUE INDEX IF NOT EXISTS project_memberships_project_device_computer_active_idx
  ON project_memberships (project_id, device_id)
  WHERE status = 'active'
    AND member_kind = 'computer';
