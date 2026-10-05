import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { updateUserProject } from "@/lib/projects/userProjectMutations";

export type ResolveProjectDeviceForCapabilityBindResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string };

/** Shared opener: owner check, Mac device match, bind empty device_id. */
const resolveProjectDeviceForCapabilityBind = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly deviceId: string;
  readonly otherMacErrorMessage: string;
}): Promise<ResolveProjectDeviceForCapabilityBindResult> => {
  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  if (
    project.deviceId !== null &&
    project.deviceId.length > 0 &&
    project.deviceId !== input.deviceId
  ) {
    return { ok: false, errorMessage: input.otherMacErrorMessage };
  }

  if (project.deviceId === null || project.deviceId.length === 0) {
    await updateUserProject(input.ownerUserId, input.projectId, {
      deviceId: input.deviceId,
    });
  }

  return { ok: true };
};

export default resolveProjectDeviceForCapabilityBind;
