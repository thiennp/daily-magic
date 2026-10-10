import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

export const resetProjectMemberPermissionsSchemaForTests = (): void => {
  state.promise = null;
};

/** Additive column mirroring migration 133; `{}` = everything allowed. */
export const ensureProjectMemberPermissionsSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      await getSql()`ALTER TABLE user_projects
        ADD COLUMN IF NOT EXISTS member_permissions JSONB NOT NULL DEFAULT '{}'::jsonb`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  await state.promise;
};
