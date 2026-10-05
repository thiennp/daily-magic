import { ensureProjectComputerHistorySchema } from "@/lib/projects/acl/ensureProjectComputerHistorySchema";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getSql } from "@/lib/db";

export const ensureProjectInviteHooksSchema = async (): Promise<void> => {
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS project_invites (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    team_label TEXT,
    scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    max_uses INTEGER NOT NULL DEFAULT 1,
    uses_remaining INTEGER NOT NULL DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS project_api_keys (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    token_prefix TEXT NOT NULL,
    token_last4 TEXT NOT NULL,
    scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ)`;
  await sql`CREATE TABLE IF NOT EXISTS project_membership_webhooks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    membership_id TEXT NOT NULL UNIQUE REFERENCES project_memberships(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    webhook_url TEXT NOT NULL,
    secret_hash TEXT NOT NULL,
    secret_prefix TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    revoke_generation INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS project_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    sender_membership_id TEXT REFERENCES project_memberships(id) ON DELETE CASCADE,
    sender_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    to_membership_id TEXT, to_user_id TEXT, to_team_label TEXT,
    to_project_display_name TEXT, kind TEXT NOT NULL, summary TEXT NOT NULL,
    refs JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), acked_at TIMESTAMPTZ)`;
  await sql`ALTER TABLE project_messages ALTER COLUMN sender_membership_id DROP NOT NULL`;
  await sql`ALTER TABLE project_membership_webhooks
    ADD COLUMN IF NOT EXISTS secret_retained TEXT`;
  await sql`CREATE TABLE IF NOT EXISTS project_membership_grok_routine_webhooks (
    membership_id TEXT PRIMARY KEY REFERENCES project_memberships(id) ON DELETE CASCADE,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    webhook_url TEXT NOT NULL,
    bearer_retained TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS project_grok_routine_wake_attempts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    message_id TEXT NOT NULL REFERENCES project_messages(id) ON DELETE CASCADE,
    membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
    result TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS project_message_deliveries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    message_id TEXT NOT NULL REFERENCES project_messages(id) ON DELETE CASCADE,
    membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
    attempt INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL,
    last_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`ALTER TABLE project_message_deliveries
    ADD COLUMN IF NOT EXISTS b2b_state TEXT`;
  await sql`ALTER TABLE project_message_deliveries
    ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ`;
  await sql`ALTER TABLE project_message_deliveries
    ADD COLUMN IF NOT EXISTS b2b_state_at TIMESTAMPTZ`;
  // DOR DDL (read_at, outcomes): ensureProjectMessageDeleteOnReadSchema
  // (called once from ensureProjectAclSchema after this function).
  await ensureProjectComputerHistorySchema();

  await purgeExpiredProjectMessages();
};
