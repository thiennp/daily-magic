-- Agent-access registration: record accepted Terms version + timestamp.
-- Nullable so existing tokens/rows keep working untouched.

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS terms_version TEXT;

ALTER TABLE agent_access_tokens
  ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ;
