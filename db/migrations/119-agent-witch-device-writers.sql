-- Coding tools (Claude Code, Codex, ...) a computer reports in its heartbeat.
ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS writers JSONB;
