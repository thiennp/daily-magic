ALTER TABLE published_capabilities
  ADD COLUMN IF NOT EXISTS operator_steps JSONB NOT NULL DEFAULT '[]'::jsonb;
