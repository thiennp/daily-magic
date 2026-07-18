ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS restart_requested_at TIMESTAMPTZ;
