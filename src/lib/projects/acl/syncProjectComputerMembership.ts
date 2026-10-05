import { revokeProjectComputerMembershipsForDevice } from "@/lib/projects/acl/revokeProjectComputerMembershipsForDevice";
import { upsertProjectComputerMembership } from "@/lib/projects/acl/upsertProjectComputerMembership";

/**
 * Keep the project's computer seat aligned with user_projects.device_id.
 * Best-effort: bind failures do not roll back the project row write.
 */
export const syncProjectComputerMembership = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly previousDeviceId: string | null;
  readonly nextDeviceId: string | null;
}): Promise<void> => {
  const previous = input.previousDeviceId?.trim() || null;
  const next = input.nextDeviceId?.trim() || null;
  if (previous === next) {
    if (next !== null) {
      await upsertProjectComputerMembership({
        projectId: input.projectId,
        ownerUserId: input.ownerUserId,
        deviceId: next,
      });
    }
    return;
  }
  if (previous !== null) {
    await revokeProjectComputerMembershipsForDevice({
      deviceId: previous,
      projectId: input.projectId,
    });
  }
  if (next !== null) {
    await upsertProjectComputerMembership({
      projectId: input.projectId,
      ownerUserId: input.ownerUserId,
      deviceId: next,
    });
  }
};
