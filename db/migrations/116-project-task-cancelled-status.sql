-- 4b1baa66: terminal task status 'cancelled' (from queued | planned |
-- in_progress | blocked; reopen -> queued) + cancelled_at timestamp.
-- Idempotent; mirrored by ensureProjectTaskRecordsSchema.ts.

ALTER TABLE project_task_records
  DROP CONSTRAINT IF EXISTS project_task_records_status_check;

ALTER TABLE project_task_records
  ADD CONSTRAINT project_task_records_status_check
  CHECK (status IN ('queued', 'planned', 'in_progress', 'blocked', 'done', 'cancelled'));

ALTER TABLE project_task_records
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;
