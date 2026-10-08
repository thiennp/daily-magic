-- 61e9c49e: two hosts on one machine and user (different HOME) share the
-- hostname#user label. install_id is a per-install fingerprint the host sends
-- in its heartbeat, so same-label auto-revoke only supersedes rows from the
-- same install (or legacy rows that never reported one).
ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS install_id TEXT;
