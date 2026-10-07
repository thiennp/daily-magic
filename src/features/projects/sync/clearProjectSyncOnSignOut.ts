import { clearProjectSyncAll } from "@/features/projects/sync/projectSyncIdb";

/** Browser privacy: wipe project-sync IDB before / with sign-out. */
export const clearProjectSyncOnSignOut = async (): Promise<void> => {
  await clearProjectSyncAll().catch(() => false);
};
