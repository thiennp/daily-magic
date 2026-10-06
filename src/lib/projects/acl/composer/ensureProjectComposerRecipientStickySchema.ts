import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

export const resetProjectComposerRecipientStickySchemaEnsureForTests =
  (): void => {
    state.promise = null;
  };

/** Idempotent DDL for composer recipient sticky (full file: migration 094). */
export const ensureProjectComposerRecipientStickySchema =
  async (): Promise<void> => {
    if (state.promise === null) {
      state.promise = (async () => {
        const sql = getSql();
        await sql`
          CREATE TABLE IF NOT EXISTS project_composer_recipient_sticky (
            project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
            actor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            mode TEXT NOT NULL CHECK (mode IN ('all', 'membership')),
            membership_id TEXT,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            PRIMARY KEY (project_id, actor_user_id),
            CONSTRAINT project_composer_recipient_sticky_membership_mode_check
              CHECK (
                (mode = 'all' AND membership_id IS NULL)
                OR (mode = 'membership' AND membership_id IS NOT NULL)
              )
          )
        `;
        await sql`
          CREATE INDEX IF NOT EXISTS project_composer_recipient_sticky_membership_idx
            ON project_composer_recipient_sticky (membership_id)
            WHERE membership_id IS NOT NULL
        `;
      })().catch((error: unknown) => {
        state.promise = null;
        throw error;
      });
    }
    return state.promise;
  };
