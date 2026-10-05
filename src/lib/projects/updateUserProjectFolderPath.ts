import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { setUserProjectLinkedDevice } from "@/lib/projects/setUserProjectLinkedDevice";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

/** Connect bind/rebind: set folder + linked device through the seat choke point. */
export const updateUserProjectFolderPath = async (
  ownerUserId: string,
  projectId: string,
  folderPath: string,
  deviceId: string,
): Promise<UserProjectRecord | null> => {
  const existing = await getUserProjectById(projectId);

  if (existing === null || existing.ownerUserId !== ownerUserId) {
    return null;
  }

  const pathUnchanged = existing.folderPath === folderPath;
  const deviceUnchanged = existing.deviceId === deviceId;

  // Skip write + schedule only when both path and device are unchanged.
  // Same-path / new-device must still persist device_id (stale otherwise).
  if (pathUnchanged && deviceUnchanged) {
    return existing;
  }

  const project = await setUserProjectLinkedDevice({
    ownerUserId,
    projectId,
    deviceId,
    folderPath,
  });

  if (project === null) {
    return null;
  }
  // Schedule only when the folder path changed; device-only writes skip notify.
  if (!pathUnchanged) {
    await scheduleProjectUpdatedNotify({
      projectId: projectId,
      fields: ["project_info"],
      actorUserId: ownerUserId,
    });
  }
  return project;
};
