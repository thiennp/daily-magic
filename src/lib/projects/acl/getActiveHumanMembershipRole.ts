import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type { ProjectMembershipRole } from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/** Active human seat role for (projectId, userId), or null if none. */
export const getActiveHumanMembershipRole = async (
  projectId: string,
  userId: string,
): Promise<ProjectMembershipRole | null> => {
  const membership = await getActiveProjectMembership(projectId, userId);
  if (membership === null || membership.memberKind !== "human") {
    return null;
  }
  return membership.role;
};
