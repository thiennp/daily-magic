import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

const createTables = async (): Promise<void> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS project_skills (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL CHECK (skill_id !~ '^_'),
    name TEXT NOT NULL, description TEXT,
    publisher_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    state TEXT NOT NULL CHECK (state IN ('draft', 'published', 'revoked')),
    published_version INTEGER, latest_version INTEGER NOT NULL DEFAULT 0,
    content_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ, revoked_by_user_id TEXT,
    UNIQUE (project_id, skill_id))`;
  await sql`CREATE TABLE IF NOT EXISTS project_skill_versions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    skill_row_id TEXT NOT NULL REFERENCES project_skills(id) ON DELETE CASCADE,
    version INTEGER NOT NULL CHECK (version > 0),
    body TEXT NOT NULL, content_hash TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size <= 65536),
    is_draft BOOLEAN NOT NULL DEFAULT FALSE,
    created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (skill_row_id, version))`;
  await sql`CREATE INDEX IF NOT EXISTS project_skills_project_state_idx
    ON project_skills (project_id, state)`;
};

/** Idempotent CREATE (full DDL in db/migrations/055-project-skill-share.sql). */
export const ensureProjectSkillShareSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = createTables().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  return state.promise;
};
