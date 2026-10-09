import { findDeviceProjectFolderPath } from "@/lib/projects/acl/findDeviceProjectFolderPath";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { isValidProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";

/**
 * Re-resolves the project folder for a stored run (approval / offline replay),
 * applying the same device-match and path-validity rules as the initial dispatch.
 */
export const resolveRunFolder = async (
  projectId: string | null,
  targetDeviceId: string | null | undefined,
): Promise<string | undefined> => {
  if (projectId === null || projectId.length === 0) {
    return undefined;
  }
  const project = await getUserProjectById(projectId);
  if (project === null) {
    return undefined;
  }
  const deviceFolder = await findDeviceProjectFolderPath(
    project.id,
    targetDeviceId,
  );
  if (deviceFolder !== null) {
    return deviceFolder;
  }
  const projectDevice = project.deviceId ?? "";
  const targetDevice = targetDeviceId ?? "";
  if (
    projectDevice.length > 0 &&
    targetDevice.length > 0 &&
    projectDevice !== targetDevice
  ) {
    return undefined;
  }
  const folderPath = project.folderPath.trim();
  return folderPath.length > 0 && isValidProjectFolderPath(folderPath)
    ? folderPath
    : undefined;
};
