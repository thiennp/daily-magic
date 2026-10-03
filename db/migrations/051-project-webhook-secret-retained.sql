-- Retain signing secret server-side so AWC can POST X-AWC-Signature on dispatch.
-- Nullable: existing rows stay unsigned until the membership re-registers.

ALTER TABLE project_membership_webhooks
  ADD COLUMN IF NOT EXISTS secret_retained TEXT;
