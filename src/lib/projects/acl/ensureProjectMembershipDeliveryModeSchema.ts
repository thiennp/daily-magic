import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectMembershipDeliveryModeSchemaEnsureForTests =
  (): void => {
    state.ensured = false;
    state.promise = null;
  };

/** Soft ensure: additive delivery_mode (CHECK lives in 071). */
export const ensureProjectMembershipDeliveryModeSchema =
  async (): Promise<void> => {
    if (state.ensured) {
      return;
    }
    if (state.promise !== null) {
      return state.promise;
    }
    state.promise = (async () => {
      const sql = getSql();
      await sql`ALTER TABLE project_memberships
        ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook'`;
      state.ensured = true;
    })();
    return state.promise;
  };
