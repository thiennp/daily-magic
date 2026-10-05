import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectUpdatedNotifyPendingSchemaEnsureForTests =
  (): void => {
    state.ensured = false;
    state.promise = null;
  };

/** Idempotent CREATE for project.updated debounce pending rows. */
export const ensureProjectUpdatedNotifyPendingSchema =
  async (): Promise<void> => {
    if (state.ensured) {
      return;
    }
    if (state.promise !== null) {
      return state.promise;
    }

    state.promise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS project_updated_notify_pending (
          project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
          state TEXT NOT NULL DEFAULT 'pending',
          fields TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
          actor_user_id TEXT,
          flush_after TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;
      await sql`
        CREATE INDEX IF NOT EXISTS project_updated_notify_pending_due_idx
          ON project_updated_notify_pending (flush_after)
          WHERE state = 'pending'`;
      state.ensured = true;
    })();

    return state.promise;
  };
