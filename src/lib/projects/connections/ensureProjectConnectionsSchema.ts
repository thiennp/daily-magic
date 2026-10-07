import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectConnectionsSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE matching db/migrations/104-project-connections.sql. */
export const ensureProjectConnectionsSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_connections (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        provider TEXT NOT NULL
          CHECK (provider IN ('slack', 'linear', 'gmail', 'github')),
        status TEXT NOT NULL DEFAULT 'none'
          CHECK (status IN ('none', 'connecting', 'connected', 'expired', 'error', 'revoked')),
        external_account_id TEXT,
        account_label TEXT,
        scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        access_token_ciphertext TEXT,
        access_token_iv TEXT,
        refresh_token_ciphertext TEXT,
        refresh_token_iv TEXT,
        token_expires_at TIMESTAMPTZ,
        created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        connected_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (project_id, provider)
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_connections_project_idx
        ON project_connections (project_id)`;
    state.ensured = true;
  })();

  try {
    await state.promise;
  } catch (error) {
    state.promise = null;
    throw error;
  }
};
