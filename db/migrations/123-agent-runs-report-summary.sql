-- c1731750: the host's one-line run report summary (and its status) reach the
-- web report. Meta only: the server caps the summary like other run meta
-- (toAgentRunNeonMetaText). Additive + idempotent.

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS report_status TEXT;

ALTER TABLE agent_runs
  ADD COLUMN IF NOT EXISTS report_summary TEXT;
