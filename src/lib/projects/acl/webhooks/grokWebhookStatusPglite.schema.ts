/** Minimal PGlite tables for readProjectGrokRoutineWebhookStatus tests. */
export const GROK_WEBHOOK_STATUS_PGLITE_SCHEMA = `
  CREATE TABLE project_memberships (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    status TEXT NOT NULL,
    role TEXT NOT NULL,
    project_display_name TEXT
  );
  CREATE TABLE project_membership_grok_routine_webhooks (
    membership_id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    webhook_url TEXT NOT NULL,
    bearer_retained TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE TABLE project_grok_routine_wake_attempts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    message_id TEXT NOT NULL,
    membership_id TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE TABLE agent_access_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    owner_user_id TEXT NOT NULL
  );
`;
