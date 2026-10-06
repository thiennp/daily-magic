-- Idempotent repair for production DBs that never applied 014-operator-steps.sql.
-- Required for createPublishedCapability INSERT (onboarding sample seed + library creates).
-- Mirrors 035-workflow-output-fields.sql for the sibling jsonb column.

ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS operator_steps JSONB NOT NULL DEFAULT '[]'::jsonb;
