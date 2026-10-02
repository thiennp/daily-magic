-- Project bot↔bot thin inbox + per-membership webhooks (RFC A3).

CREATE TABLE IF NOT EXISTS project_membership_webhooks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  webhook_url TEXT NOT NULL,
  secret_hash TEXT NOT NULL,
  secret_prefix TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  revoke_generation INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (membership_id)
);

CREATE INDEX IF NOT EXISTS project_membership_webhooks_project_idx
  ON project_membership_webhooks (project_id, enabled);

CREATE TABLE IF NOT EXISTS project_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  sender_membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  sender_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_membership_id TEXT REFERENCES project_memberships(id) ON DELETE SET NULL,
  to_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  to_team_label TEXT,
  to_project_display_name TEXT,
  kind TEXT NOT NULL,
  summary TEXT NOT NULL,
  refs JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS project_messages_inbox_idx
  ON project_messages (project_id, to_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS project_messages_project_created_idx
  ON project_messages (project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS project_message_deliveries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  message_id TEXT NOT NULL REFERENCES project_messages(id) ON DELETE CASCADE,
  membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
  attempt INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending', 'delivered', 'failed', 'skipped')),
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (message_id, membership_id)
);
