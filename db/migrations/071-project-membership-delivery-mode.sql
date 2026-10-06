-- Wake / Non-Grok S4+S5 contract: per-membership inbox delivery mode.
-- webhook = wake-link (existing 5m/10m silence+block). poll = no-wake /
-- checks-on-demand (S5 skips silence notify+block; senders see "Checks on demand").
-- Default webhook keeps every existing seat on today's wake silence path.
-- S4 owns writers/flip-on-wake-link; S5 only reads this column.

ALTER TABLE project_memberships
  ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook';

ALTER TABLE project_memberships
  DROP CONSTRAINT IF EXISTS project_memberships_delivery_mode_check;

ALTER TABLE project_memberships
  ADD CONSTRAINT project_memberships_delivery_mode_check
  CHECK (delivery_mode IN ('webhook', 'poll'));
