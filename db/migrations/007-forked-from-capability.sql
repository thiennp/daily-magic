ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS forked_from_capability_id TEXT
    REFERENCES published_capabilities(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS published_capabilities_forked_from_idx
  ON published_capabilities (forked_from_capability_id)
  WHERE forked_from_capability_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS capability_forks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  borrower_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  forked_capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  forked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS capability_forks_borrower_idx
  ON capability_forks (borrower_user_id, forked_at DESC);
