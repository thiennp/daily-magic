-- Owner improvement proposals from feedback (Phase 3)

CREATE TABLE IF NOT EXISTS capability_improvements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  feedback_id TEXT REFERENCES capability_feedback(id) ON DELETE SET NULL,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  suggestion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed', 'accepted', 'rejected')),
  resulting_version_id TEXT REFERENCES capability_versions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capability_improvements_owner_idx
  ON capability_improvements (owner_user_id, status, created_at DESC);
