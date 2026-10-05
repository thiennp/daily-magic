import { ensureProjectInviteHooksSchema } from "@/lib/projects/acl/ensureProjectInviteHooksSchema";
import {
  ensureProjectMessageDeleteOnReadSchema,
  resetProjectMessageDeleteOnReadSchemaForTests,
} from "@/lib/projects/acl/messaging/ensureProjectMessageDeleteOnReadSchema";
import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectAclSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
  resetProjectMessageDeleteOnReadSchemaForTests();
};

/** Idempotent CREATE for ACL tables (full DDL in migrations; audit table dropped 049). */
export const ensureProjectAclSchema = async (): Promise<void> => {
  if (state.ensured) {
    return;
  }
  if (state.promise !== null) {
    return state.promise;
  }

  state.promise = (async () => {
    const sql = getSql();
    await sql`CREATE TABLE IF NOT EXISTS project_memberships (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role TEXT NOT NULL, status TEXT NOT NULL, team_label TEXT,
      scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      project_display_name TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), revoked_at TIMESTAMPTZ)`;
    await sql`ALTER TABLE project_memberships
      ADD COLUMN IF NOT EXISTS project_display_name TEXT`;
    await sql`CREATE TABLE IF NOT EXISTS project_access_requests (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      requester_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      invited_by_user_id TEXT, reason TEXT,
      requested_scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      status TEXT NOT NULL, decided_by_user_id TEXT, decided_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '14 days'),
      invite_id TEXT, team_label TEXT)`;
    await sql`ALTER TABLE project_access_requests
      ADD COLUMN IF NOT EXISTS invite_id TEXT`;
    await sql`ALTER TABLE project_access_requests
      ADD COLUMN IF NOT EXISTS team_label TEXT`;
    await sql`ALTER TABLE project_access_requests
      ADD COLUMN IF NOT EXISTS suggested_project_display_name TEXT`;
    await sql`CREATE TABLE IF NOT EXISTS project_folder_refs (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      machine_or_device_ref TEXT NOT NULL, folder_path TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    await ensureProjectInviteHooksSchema();
    // Single entry for delete-on-read / ack outcome tables (needs project_messages).
    await ensureProjectMessageDeleteOnReadSchema();
    await sql`ALTER TABLE project_memberships
      ADD COLUMN IF NOT EXISTS member_kind TEXT`;
    await sql`UPDATE project_memberships
      SET member_kind = 'bot' WHERE member_kind IS NULL`;
    await sql`CREATE TABLE IF NOT EXISTS project_human_invites (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      email TEXT,
      role TEXT NOT NULL,
      max_uses INTEGER NOT NULL DEFAULT 1,
      uses_remaining INTEGER NOT NULL DEFAULT 1,
      expires_at TIMESTAMPTZ NOT NULL,
      revoked_at TIMESTAMPTZ,
      redeemed_at TIMESTAMPTZ,
      redeemed_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    await sql`ALTER TABLE project_human_invites
      ADD COLUMN IF NOT EXISTS require_email_match BOOLEAN NOT NULL DEFAULT false`;

    await sql`CREATE TABLE IF NOT EXISTS project_membership_display_name_aliases (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      membership_id TEXT NOT NULL REFERENCES project_memberships(id) ON DELETE CASCADE,
      display_name TEXT NOT NULL,
      display_name_key TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    await sql`CREATE INDEX IF NOT EXISTS project_membership_display_name_aliases_lookup_idx
      ON project_membership_display_name_aliases (project_id, display_name_key, expires_at)`;
    // Softvale: memberships approved from pre-msg:dispatch requested_scopes.
    await sql`
      UPDATE project_memberships
      SET scopes = array_append(scopes, 'msg:dispatch')
      WHERE status = 'active'
        AND role = 'member'
        AND NOT ('msg:dispatch' = ANY (scopes))`;
    state.ensured = true;
  })();

  return state.promise;
};
