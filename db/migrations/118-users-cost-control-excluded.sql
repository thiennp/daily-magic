-- Admin checkbox: leave a real user out of the per-user trial cost estimate.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS cost_control_excluded BOOLEAN NOT NULL DEFAULT FALSE;
