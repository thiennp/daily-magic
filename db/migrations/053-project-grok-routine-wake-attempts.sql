-- Short Grok routine wake result per stored message and recipient.
-- Values are http_<status>, fetch_failed, or not_postable. Never a URL or bearer.

CREATE TABLE IF NOT EXISTS project_grok_routine_wake_attempts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  message_id TEXT NOT NULL REFERENCES project_messages(id) ON DELETE CASCADE,
  membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  result TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
