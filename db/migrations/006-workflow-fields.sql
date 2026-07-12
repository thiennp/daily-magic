-- Workflow field definitions on published capabilities (Phase 4)

ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS workflow_fields JSONB NOT NULL DEFAULT '[]'::jsonb;
