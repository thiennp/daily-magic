-- S0-7 kill switch: a per-run stop request that survives instance hops.
-- Any instance records the request; the instance that owns the computer's
-- socket applies it on the next run.heartbeat (or immediately via
-- agent_witch_hub_dispatch_relay). Additive + idempotent.

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS stop_requested_at TIMESTAMPTZ;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS stop_requested_by_user_id TEXT
    REFERENCES users(id) ON DELETE SET NULL;
