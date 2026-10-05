import {
  decideProjectOwnerAccess,
  type ProjectOwnerAccessDecision,
} from "@/lib/projects/acl/decideProjectOwnerAccess";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** The one permission check for owner routes: load the project owner, apply the pure rule. */
export const authorizeProjectOwner = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectOwnerAccessDecision> => {
  const project = await getUserProjectById(input.projectId);
  return decideProjectOwnerAccess({
    actorUserId: input.actorUserId,
    projectOwnerUserId: project?.ownerUserId ?? null,
  });
};
