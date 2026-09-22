ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'mac'
  CHECK (platform IN ('mac', 'linux'));
