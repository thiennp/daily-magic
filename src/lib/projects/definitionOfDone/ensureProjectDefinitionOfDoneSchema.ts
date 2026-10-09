import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectDefinitionOfDoneSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE matching db/migrations/130-project-definition-of-done.sql. */
export const ensureProjectDefinitionOfDoneSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_definition_of_done (
        project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
        body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 600),
        updated_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    state.ensured = true;
  })().finally(() => {
    state.promise = null;
  });
  return state.promise;
};
