-- Optional agent-suggested nickname on invite redeem (prefill / Approve auto-apply).
-- Soft uniqueness at redeem; hard unique still on Approve membership insert.

ALTER TABLE project_access_requests
  ADD COLUMN IF NOT EXISTS suggested_project_display_name TEXT NULL;
