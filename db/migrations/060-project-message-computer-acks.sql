-- computerAck: the owner's project computer saved this message locally.
-- Separate thin table on purpose: project_messages rows are hard-deleted,
-- so there is no FK to them and nothing cascades. Ids only, no content.
-- Stale rows (message gone, older than the unsaved-flag age) are purged.
--
-- CREATE TABLE lives ONLY in migration 056. This migration owns the full
-- device_id path: ADD / backfill UPDATE / DELETE nulls / SET NOT NULL, plus
-- message and acked indexes. Soft ensure (ensureProjectComputerHistorySchema)
-- mirrors only the additive ADD COLUMN + CREATE INDEX steps.

-- Stub tables created without device_id: add it (nullable first).
ALTER TABLE project_message_computer_acks
  ADD COLUMN IF NOT EXISTS device_id TEXT;

-- Backfill from the project's bound device when known.
UPDATE project_message_computer_acks AS a
SET device_id = p.device_id
FROM user_projects AS p
WHERE a.project_id = p.id
  AND a.device_id IS NULL
  AND p.device_id IS NOT NULL
  AND length(p.device_id) > 0;

-- Rows that still lack a device cannot satisfy History's NOT NULL contract.
DELETE FROM project_message_computer_acks
WHERE device_id IS NULL;

ALTER TABLE project_message_computer_acks
  ALTER COLUMN device_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS project_message_computer_acks_acked_idx
  ON project_message_computer_acks (acked_at);

CREATE INDEX IF NOT EXISTS project_message_computer_acks_message_idx
  ON project_message_computer_acks (message_id);
