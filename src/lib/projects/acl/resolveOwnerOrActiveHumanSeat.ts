import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type OwnerOrActiveHumanSeat =
  | {
      readonly ok: true;
      readonly project: UserProjectRecord;
      readonly kind: "owner";
      readonly membership: null;
    }
  | {
      readonly ok: true;
      readonly project: UserProjectRecord;
      readonly kind: "human";
      readonly membership: ProjectMembershipRecord;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Session gate for human-readable project surfaces (Messages log, Access GET).
 * Owner always; active human member|viewer seats. Bot seats stay MCP-only here.
 */
export const resolveOwnerOrActiveHumanSeat = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<OwnerOrActiveHumanSeat> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId === input.actorUserId) {
    return { ok: true, project, kind: "owner", membership: null };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null || membership.memberKind !== "human") {
    return { ok: false, code: "forbidden" };
  }
  if (membership.role !== "member" && membership.role !== "viewer") {
    return { ok: false, code: "forbidden" };
  }
  return { ok: true, project, kind: "human", membership };
};
