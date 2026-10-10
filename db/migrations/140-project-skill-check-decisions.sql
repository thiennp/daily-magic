-- The owner's answer to a judged skill check that proposes a better version:
-- use the old one, switch to the new one, or run both to compare.
ALTER TABLE project_skill_checks
  ADD COLUMN IF NOT EXISTS decision TEXT
    CHECK (decision IS NULL OR decision IN ('old', 'new', 'both')),
  ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS decided_by_user_id TEXT,
  ADD COLUMN IF NOT EXISTS new_version INTEGER;
