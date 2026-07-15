CREATE TABLE IF NOT EXISTS agent_automations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  capability_id TEXT NOT NULL REFERENCES published_capabilities(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES agent_witch_devices(id) ON DELETE SET NULL,
  executor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('schedule', 'webhook')),
  schedule_preset TEXT CHECK (schedule_preset IN ('hourly', 'daily', 'weekdays')),
  schedule_hour INTEGER CHECK (schedule_hour >= 0 AND schedule_hour <= 23),
  schedule_timezone TEXT NOT NULL DEFAULT 'UTC',
  webhook_secret_hash TEXT,
  webhook_secret_prefix TEXT,
  field_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  enabled BOOLEAN NOT NULL DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  last_run_status TEXT CHECK (last_run_status IN ('ok', 'skipped', 'failed')),
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT agent_automations_schedule_fields_chk CHECK (
    (
      trigger_type = 'schedule'
      AND schedule_preset IS NOT NULL
      AND (
        schedule_preset = 'hourly'
        OR schedule_hour IS NOT NULL
      )
    )
    OR (
      trigger_type = 'webhook'
      AND schedule_preset IS NULL
      AND schedule_hour IS NULL
      AND webhook_secret_hash IS NOT NULL
    )
  )
);

CREATE INDEX IF NOT EXISTS agent_automations_owner_idx
  ON agent_automations (owner_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS agent_automations_due_schedule_idx
  ON agent_automations (next_run_at ASC)
  WHERE enabled = true AND trigger_type = 'schedule';

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS automation_id TEXT REFERENCES agent_automations(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS agent_runs_automation_idx
  ON agent_runs (automation_id, created_at DESC)
  WHERE automation_id IS NOT NULL;
