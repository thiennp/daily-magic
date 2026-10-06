-- Durable invite auto-approve history for a future Activity backfill.
CREATE TABLE IF NOT EXISTS project_invite_auto_approve_events (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  invite_id TEXT NOT NULL,
  invite_label TEXT NOT NULL,
  event TEXT NOT NULL
    CHECK (event IN ('enabled', 'disabled', 'member_auto_approved')),
  actor_user_id TEXT,
  membership_id TEXT,
  member_display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_invite_auto_approve_events_project_created_idx
  ON project_invite_auto_approve_events (project_id, created_at DESC);

CREATE INDEX IF NOT EXISTS project_invite_auto_approve_events_invite_idx
  ON project_invite_auto_approve_events (invite_id);
