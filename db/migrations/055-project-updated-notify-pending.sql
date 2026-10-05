-- Debounced project.updated fan-out (Wake). One pending row per project.
-- States: pending → flushed (then deleted → idle). Trailing debounce resets
-- flush_after on each schedule. Multi-instance safe via conditional claim.

CREATE TABLE IF NOT EXISTS project_updated_notify_pending (
  project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'pending',
  fields TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  actor_user_id TEXT,
  flush_after TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_updated_notify_pending_due_idx
  ON project_updated_notify_pending (flush_after)
  WHERE state = 'pending';
