import { setUserProjectLinkedDevice } from "@/lib/projects/setUserProjectLinkedDevice";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Connect bind/rebind: set folder + linked device through the seat choke point. */
export const updateUserProjectFolderPath = async (
  ownerUserId: string,
  projectId: string,
  folderPath: string,
  deviceId: string,
): Promise<UserProjectRecord | null> =>
  setUserProjectLinkedDevice({
    ownerUserId,
    projectId,
    deviceId,
    folderPath,
  });
