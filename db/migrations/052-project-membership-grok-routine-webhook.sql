-- Per-membership Grok routine wake credential. Separate from HMAC secret_retained.
-- Bearer is stored for Authorization on dispatch and is never returned by reads.

CREATE TABLE IF NOT EXISTS project_membership_grok_routine_webhooks (
  membership_id TEXT PRIMARY KEY REFERENCES project_memberships(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  webhook_url TEXT NOT NULL,
  bearer_retained TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
