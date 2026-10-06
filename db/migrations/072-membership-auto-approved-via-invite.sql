-- Mark memberships admitted by invite auto-approve (for Access banner/badge).
ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS auto_approved_via_invite_label TEXT;
