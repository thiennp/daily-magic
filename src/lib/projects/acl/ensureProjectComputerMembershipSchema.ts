import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectComputerMembershipSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Soft ensure: additive device_id + computer unique index. CHECKs live in 068. */
export const ensureProjectComputerMembershipSchema = async (): Promise<void> => {
  if (state.ensured) {
    return;
  }
  if (state.promise !== null) {
    return state.promise;
  }
  state.promise = (async () => {
    const sql = getSql();
    await sql`ALTER TABLE project_memberships
      ADD COLUMN IF NOT EXISTS device_id TEXT`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS
      project_memberships_project_device_computer_active_idx
      ON project_memberships (project_id, device_id)
      WHERE status = 'active' AND member_kind = 'computer'`;
    state.ensured = true;
  })();
  return state.promise;
};
