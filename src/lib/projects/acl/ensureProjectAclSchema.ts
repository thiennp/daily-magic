import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectAclSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE for ACL tables (full DDL also in 041/044 migrations). */
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
    await sql`CREATE TABLE IF NOT EXISTS project_access_audit (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      actor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      action TEXT NOT NULL, target_user_id TEXT,
      at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      detail JSONB NOT NULL DEFAULT '{}'::jsonb)`;
    await sql`CREATE TABLE IF NOT EXISTS project_folder_refs (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
      machine_or_device_ref TEXT NOT NULL, folder_path TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
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
    state.ensured = true;
  })();

  return state.promise;
};
