-- Local-first agent runs: drop Postgres persistence for agent_runs / agent_run_queue.

ALTER TABLE capability_feedback
  DROP CONSTRAINT IF EXISTS capability_feedback_agent_run_id_fkey;

ALTER TABLE capability_feedback
  ADD COLUMN IF NOT EXISTS run_prompt TEXT,
  ADD COLUMN IF NOT EXISTS run_status TEXT,
  ADD COLUMN IF NOT EXISTS run_executor_user_id TEXT;

UPDATE capability_feedback AS f
SET
  run_prompt = r.prompt,
  run_status = r.status,
  run_executor_user_id = r.executor_user_id
FROM agent_runs AS r
WHERE f.agent_run_id = r.id
  AND f.run_prompt IS NULL;

DROP TABLE IF EXISTS agent_run_queue;
DROP TABLE IF EXISTS agent_runs;
