import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";

/**
 * AW f0803ba9 follow-up: a folder linked from AgentWitch Local also becomes a
 * project folder ref, so it shows in AWC's Folders list. Best-effort: a
 * failure is logged and never fails the device patch (never throws).
 */
export const linkDeviceProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly deviceId: string;
  readonly folderPath: string;
}): Promise<void> => {
  const folderPath = input.folderPath.trim();
  if (folderPath.length === 0) return;
  try {
    const result = await upsertProjectFolderRef({
      projectId: input.projectId,
      ownerUserId: input.ownerUserId,
      machineOrDeviceRef: input.deviceId,
      deviceId: input.deviceId,
      folderPath,
    });
    if (!result.ok) {
      console.warn("[device-project-patch] folder ref skipped", {
        projectId: input.projectId,
        deviceId: input.deviceId,
        code: result.code,
      });
    }
  } catch (error) {
    console.error("[device-project-patch] folder ref failed", {
      projectId: input.projectId,
      deviceId: input.deviceId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
