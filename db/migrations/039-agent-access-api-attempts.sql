CREATE TABLE IF NOT EXISTS agent_access_api_attempts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  subject_hash TEXT NOT NULL,
  bucket TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_access_api_attempts_subject_idx
  ON agent_access_api_attempts (subject_hash, bucket, created_at DESC);
