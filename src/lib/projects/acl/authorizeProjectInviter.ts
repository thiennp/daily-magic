import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type { ProjectOwnerAccessDecision } from "@/lib/projects/acl/decideProjectOwnerAccess";

/**
 * Who may see and send person invites: the owner, or an active human member
 * (role `member`). Viewers, bots and non-members are forbidden. Revoking
 * invites and removing people stay owner-only (authorizeProjectOwner).
 */
export const authorizeProjectInviter = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectOwnerAccessDecision> => {
  const owner = await authorizeProjectOwner(input);
  if (owner.allow || owner.reason === "not_found") return owner;
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  const isHumanMember =
    membership !== null &&
    (membership.memberKind ?? "bot") === "human" &&
    membership.role === "member";
  return isHumanMember
    ? { allow: true }
    : { allow: false, reason: "forbidden" };
};
