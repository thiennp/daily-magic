import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectSyncSchemaForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/**
 * Soft ensure for sync relay tables (migration 102). Additive CREATE IF NOT
 * EXISTS only — mirrors numbered migration.
 */
export const ensureProjectSyncSchema = async (): Promise<void> => {
  if (state.ensured) {
    return;
  }
  if (state.promise !== null) {
    return state.promise;
  }
  state.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_sync_devices (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        device_id TEXT NOT NULL,
        membership_id TEXT,
        folder_ref_id TEXT,
        enabled BOOLEAN NOT NULL DEFAULT FALSE,
        synced_once BOOLEAN NOT NULL DEFAULT FALSE,
        last_pulled_seq BIGINT NOT NULL DEFAULT 0,
        state TEXT NOT NULL DEFAULT 'off',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (project_id, device_id)
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_sync_files (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        path TEXT NOT NULL,
        kind TEXT NOT NULL,
        head_seq BIGINT NOT NULL DEFAULT 0,
        content_sha256 TEXT NOT NULL DEFAULT '',
        size_bytes INTEGER NOT NULL DEFAULT 0,
        origin_device_id TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (project_id, path)
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_sync_versions (
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        seq BIGSERIAL,
        path TEXT NOT NULL,
        base_seq BIGINT NOT NULL DEFAULT 0,
        content_sha256 TEXT NOT NULL,
        size_bytes INTEGER NOT NULL DEFAULT 0,
        origin_device_id TEXT NOT NULL,
        outcome TEXT NOT NULL DEFAULT 'head',
        kind TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (project_id, seq)
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_sync_blobs (
        content_sha256 TEXT NOT NULL,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        size_bytes INTEGER NOT NULL,
        chunk_count INTEGER NOT NULL DEFAULT 1,
        bytes BYTEA NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (content_sha256, project_id)
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_sync_acks (
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        seq BIGINT NOT NULL,
        device_id TEXT NOT NULL,
        acked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (project_id, seq, device_id)
      )`;
    state.ensured = true;
  })();
  return state.promise;
};
