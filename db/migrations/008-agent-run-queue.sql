-- Queue agent runs when the browser or executor Mac is offline

CREATE TABLE IF NOT EXISTS agent_run_queue (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id TEXT REFERENCES groups(id) ON DELETE SET NULL,
  capability_id TEXT REFERENCES published_capabilities(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_run_queue_requester_idx
  ON agent_run_queue (requester_user_id, created_at ASC);
