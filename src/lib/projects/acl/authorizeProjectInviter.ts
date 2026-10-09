import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type { ProjectOwnerAccessDecision } from "@/lib/projects/acl/decideProjectOwnerAccess";

export type ProjectInviterDecision =
  | { readonly allow: true; readonly owner: boolean }
  | Extract<ProjectOwnerAccessDecision, { readonly allow: false }>;

/**
 * Who may see and send person invites: the owner, or an active human member
 * (role `member`). Viewers, bots and non-members are forbidden. Invites a
 * non-owner sends always need the owner's approval (`owner: false`). Revoking
 * invites and removing people stay owner-only (authorizeProjectOwner).
 */
export const authorizeProjectInviter = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectInviterDecision> => {
  const owner = await authorizeProjectOwner(input);
  if (owner.allow) return { allow: true, owner: true };
  if (owner.reason === "not_found") return owner;
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  const isHumanMember =
    membership !== null &&
    (membership.memberKind ?? "bot") === "human" &&
    membership.role === "member";
  return isHumanMember
    ? { allow: true, owner: false }
    : { allow: false, reason: "forbidden" };
};
