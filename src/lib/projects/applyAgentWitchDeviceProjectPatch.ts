import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { updateUserProject } from "@/lib/projects/updateUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import { projectUpdatedNotifyFieldsForUserProjectPatch } from "@/lib/projects/acl/messaging/projectUpdatedNotifyFieldsForUserProjectPatch";

export type ApplyAgentWitchDeviceProjectPatchInput = {
  readonly ownerUserId: string;
  readonly deviceId: string;
  readonly projectId: string;
  readonly folderPath: string | null;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
  readonly hasRepoUpdate: boolean;
};

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

  const project = input.hasRepoUpdate
    ? await updateUserProject(input.ownerUserId, input.projectId, {
        ...(input.repoUrls !== undefined ? { repoUrls: input.repoUrls } : {}),
        ...(input.defaultBranch !== undefined
          ? { defaultBranch: input.defaultBranch }
          : {}),
      })
    : afterFolder;

  if (project === null) {
    return null;
  }

  const fields = projectUpdatedNotifyFieldsForUserProjectPatch({
    ...(input.folderPath !== null ? { folderPath: input.folderPath } : {}),
    ...(input.repoUrls !== undefined ? { repoUrls: input.repoUrls } : {}),
    ...(input.defaultBranch !== undefined
      ? { defaultBranch: input.defaultBranch }
      : {}),
  });
  if (fields.length > 0) {
    await scheduleProjectUpdatedNotify({
      projectId: input.projectId,
      fields,
      actorUserId: input.ownerUserId,
    });
  }
  return project;
};
