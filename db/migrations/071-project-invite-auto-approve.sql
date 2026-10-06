-- Per-invite owner opt-in: auto-approve assistants that redeem this invite (default off).
ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS auto_approve BOOLEAN NOT NULL DEFAULT FALSE;
