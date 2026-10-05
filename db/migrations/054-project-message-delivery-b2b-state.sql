-- Bot-to-bot silence watch per delivery. States and transitions live in
-- src/lib/projects/acl/messaging/projectB2bStateMachine.ts.
-- NULL b2b_state = not watched. last_activity_at is the wake time, then B's
-- latest activity; the 5 and 10 minute timeouts are measured from it.
-- Rows go away with the message on ack (CASCADE), which ends the watch.

ALTER TABLE project_message_deliveries
  ADD COLUMN IF NOT EXISTS b2b_state TEXT;

ALTER TABLE project_message_deliveries
  ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ;

ALTER TABLE project_message_deliveries
  ADD COLUMN IF NOT EXISTS b2b_state_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS project_message_deliveries_b2b_watch_idx
  ON project_message_deliveries (b2b_state, last_activity_at)
  WHERE b2b_state IS NOT NULL;
