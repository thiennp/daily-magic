import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { upsertProjectFolderRef } from "@/lib/projects/acl/upsertProjectFolderRef";
import { linkDeviceProjectFolderRef } from "@/lib/projects/linkDeviceProjectFolderRef";
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
 * (updateUserProjectFolderPath / updateUserProject / upsertProjectFolderRef) —
 * no orchestrator re-schedule. A linked folder is also upserted as a folder
 * ref (best-effort) so it shows in AWC's Folders list.
 */
/**
 * A member's computer registers its own folder as a folder ref; the project's
 * default folder, device and repo metadata stay the owner's.
 */
const applyMemberDevicePatch = async (
  input: ApplyAgentWitchDeviceProjectPatchInput,
  project: UserProjectRecord,
): Promise<UserProjectRecord | null> => {
  const actor = await resolveFolderRefActor({
    projectId: project.id,
    actorUserId: input.ownerUserId,
  });
  if (!actor.ok) return null;
  const folderPath = input.folderPath?.trim() ?? "";
  if (folderPath.length === 0) return project;
  const result = await upsertProjectFolderRef({
    projectId: project.id,
    ownerUserId: input.ownerUserId,
    machineOrDeviceRef: input.deviceId,
    deviceId: input.deviceId,
    folderPath,
  });
  return result.ok ? { ...project, folderPath } : null;
};

export const applyAgentWitchDeviceProjectPatch = async (
  input: ApplyAgentWitchDeviceProjectPatchInput,
): Promise<UserProjectRecord | null> => {
  const current = await getUserProjectById(input.projectId.trim());
  if (current !== null && current.ownerUserId !== input.ownerUserId) {
    return applyMemberDevicePatch(input, current);
  }
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

  if (input.folderPath !== null) {
    await linkDeviceProjectFolderRef({
      projectId: input.projectId,
      ownerUserId: input.ownerUserId,
      deviceId: input.deviceId,
      folderPath: input.folderPath,
    });
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
