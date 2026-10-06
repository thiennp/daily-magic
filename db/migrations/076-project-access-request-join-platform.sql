-- Invite redeem: the joining assistant's own type (redeem_project_invite
-- `joinType`, from GET /join/{inviteToken} types[]), stored as the platform
-- the Wake S5 join resolver reads (resolveInitialProjectMembershipDeliveryMode).
-- grok = wake by default; any other named type (claude, chatgpt,
-- copilot_studio, …) starts in poll ("Checks on demand") unless a wake link
-- exists. NULL = not given; the invite's platform (075) applies as before.
ALTER TABLE project_access_requests
  ADD COLUMN IF NOT EXISTS join_platform TEXT;
