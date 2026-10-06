import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

export const resetProjectRunsWithoutApprovalSchemaForTests = (): void => {
  state.promise = null;
};

/**
 * Soft ensure: additive column only (the Access log CHECK lives in 095).
 * Lets dispatch read the flag even before 095 has run; default OFF.
 */
export const ensureProjectRunsWithoutApprovalSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      await getSql()`ALTER TABLE user_projects
        ADD COLUMN IF NOT EXISTS allow_runs_without_approval BOOLEAN NOT NULL DEFAULT FALSE`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  await state.promise;
};
