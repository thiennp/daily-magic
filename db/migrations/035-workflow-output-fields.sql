-- Idempotent repair for production DBs that never applied 014-workflow-field-uploads.sql.
-- Required for marketplace preset install (createPublishedCapability INSERT).

ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS workflow_output_fields JSONB NOT NULL DEFAULT '[]'::jsonb;
