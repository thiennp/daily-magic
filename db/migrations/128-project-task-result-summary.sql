-- Outcome a bot writes when it finishes a task (≤600 chars, short summary only).
-- Idempotent; mirrored by ensureProjectTaskRecordsSchema.ts.
ALTER TABLE project_task_records
  ADD COLUMN IF NOT EXISTS result_summary TEXT;
