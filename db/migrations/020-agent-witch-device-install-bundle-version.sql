-- Mac-reported install bundle version from agent.heartbeat.

ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS install_bundle_version TEXT;
