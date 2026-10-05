import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type ProjectPageActorRole = "owner" | "member" | "viewer";

export type AuthorizeProjectPageActorResult =
  | {
      readonly ok: true;
      readonly project: UserProjectRecord;
      readonly role: ProjectPageActorRole;
      readonly membership: ProjectMembershipRecord | null;
    }
  | { readonly ok: false; readonly reason: "not_found" | "forbidden" };

/**
 * Session page guard for /projects/[projectId].
 * Owner always; active human member|viewer seats (member_kind=human).
 * Bot seats stay MCP-only (no browser project page).
 */
export const authorizeProjectPageActor = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<AuthorizeProjectPageActorResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, reason: "not_found" };
  }
  if (project.ownerUserId === input.actorUserId) {
    return { ok: true, project, role: "owner", membership: null };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, reason: "forbidden" };
  }
  const kind = membership.memberKind ?? "bot";
  if (kind !== "human") {
    return { ok: false, reason: "forbidden" };
  }
  if (membership.role !== "member" && membership.role !== "viewer") {
    return { ok: false, reason: "forbidden" };
  }
  return {
    ok: true,
    project,
    role: membership.role,
    membership,
  };
};
