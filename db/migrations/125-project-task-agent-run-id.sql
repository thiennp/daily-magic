-- Planned tasks follow their run: the agent run started from (or created for)
-- a task record is stored here so run status changes can move the task.
-- Idempotent; mirrored by ensureProjectTaskRecordsSchema.ts.
ALTER TABLE project_task_records
  ADD COLUMN IF NOT EXISTS agent_run_id TEXT;

CREATE INDEX IF NOT EXISTS project_task_records_agent_run_idx
  ON project_task_records (agent_run_id) WHERE agent_run_id IS NOT NULL;
