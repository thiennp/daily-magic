import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type FolderRefActor =
  | { readonly ok: true; readonly isOwner: boolean }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Who may manage folder refs: the owner (any computer) or an active human
 * member (not a viewer), who manages only folders on their own computers.
 */
export const resolveFolderRefActor = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<FolderRefActor> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) return { ok: false, code: "not_found" };
  if (project.ownerUserId === input.actorUserId) {
    return { ok: true, isOwner: true };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  const isMember =
    membership !== null &&
    membership.role === "member" &&
    membership.memberKind === "human";
  return isMember
    ? { ok: true, isOwner: false }
    : { ok: false, code: "forbidden" };
};
