import { clearProjectSyncForProject } from "@/features/projects/sync/projectSyncIdb";

/** Browser privacy: clear IDB for one project after leave / delete succeeds. */
export const clearProjectSyncOnLeave = async (
  projectId: string,
): Promise<void> => {
  await clearProjectSyncForProject(projectId).catch(() => false);
};
