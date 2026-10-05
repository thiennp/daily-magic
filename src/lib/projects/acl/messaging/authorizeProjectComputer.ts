import {
  decideProjectComputerAccess,
  type ProjectComputerAccessDecision,
} from "@/lib/projects/acl/messaging/decideProjectComputerAccess";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** Load the project, apply the pure owner's-project-computer rule. */
export const authorizeProjectComputer = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly deviceUserId: string;
}): Promise<ProjectComputerAccessDecision> => {
  const project = await getUserProjectById(input.projectId);
  return decideProjectComputerAccess({
    deviceId: input.deviceId,
    deviceUserId: input.deviceUserId,
    projectOwnerUserId: project?.ownerUserId ?? null,
    projectDeviceId: project?.deviceId ?? null,
  });
};
