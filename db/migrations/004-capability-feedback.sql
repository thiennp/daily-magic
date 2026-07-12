-- Capability feedback from requesters after agent runs (Phase 2)

CREATE TABLE IF NOT EXISTS capability_feedback (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_run_id TEXT NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  reviewer_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'acknowledged', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (agent_run_id, reviewer_user_id)
);

CREATE INDEX IF NOT EXISTS capability_feedback_owner_lookup_idx
  ON capability_feedback (capability_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS capability_feedback_reviewer_idx
  ON capability_feedback (reviewer_user_id, created_at DESC);
