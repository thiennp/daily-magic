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

/** Soft ensure: additive delivery_mode + invite platform (CHECK + backfill live in 075). */
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
      // Invite platform feeds the connect-time mode on join (075).
      await sql`ALTER TABLE IF EXISTS project_invites
        ADD COLUMN IF NOT EXISTS platform TEXT`;
      state.ensured = true;
    })();
    return state.promise;
  };
