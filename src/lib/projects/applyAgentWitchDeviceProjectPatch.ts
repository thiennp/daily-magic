import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { updateUserProject } from "@/lib/projects/updateUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";

export type ApplyAgentWitchDeviceProjectPatchInput = {
  readonly ownerUserId: string;
  readonly deviceId: string;
  readonly projectId: string;
  readonly folderPath: string | null;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
  readonly hasRepoUpdate: boolean;
};

/**
 * Apply device folder/repo patch. Schedules project.updated only via leaf writes
 * (updateUserProjectFolderPath / updateUserProject) — no orchestrator re-schedule.
 */
export const applyAgentWitchDeviceProjectPatch = async (
  input: ApplyAgentWitchDeviceProjectPatchInput,
): Promise<UserProjectRecord | null> => {
  const afterFolder =
    input.folderPath !== null
      ? await updateUserProjectFolderPath(
          input.ownerUserId,
          input.projectId,
          input.folderPath,
          input.deviceId,
        )
      : await getUserProjectById(input.projectId.trim());

  if (afterFolder === null || afterFolder.ownerUserId !== input.ownerUserId) {
    return null;
  }

  if (!input.hasRepoUpdate) {
    return afterFolder;
  }

  return updateUserProject(input.ownerUserId, input.projectId, {
    ...(input.repoUrls !== undefined ? { repoUrls: input.repoUrls } : {}),
    ...(input.defaultBranch !== undefined
      ? { defaultBranch: input.defaultBranch }
      : {}),
  });
};
