import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { decideProjectMessagePostAccess } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ProjectTaskWriterDenyCode =
  | "not_found"
  | "forbidden"
  | "viewer_read_only"
  | "naming_required"
  | "missing_scope";

export type ProjectTaskWriter =
  | {
      readonly ok: true;
      readonly ownerUserId: string;
      /** Null when the caller is the project owner. */
      readonly membership: ProjectMembershipRecord | null;
    }
  | { readonly ok: false; readonly code: ProjectTaskWriterDenyCode };

/**
 * Who may create/update project Tasks (DF-024): the owner, or an active
 * member that passes the same post gate as project_dispatch (assistants with
 * msg:dispatch, human members). Viewers → viewer_read_only (sync 403 twin);
 * non-members → forbidden.
 */
export const authorizeProjectTaskWriter = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectTaskWriter> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId === input.actorUserId) {
    return { ok: true, ownerUserId: project.ownerUserId, membership: null };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "forbidden" };
  }
  const access = decideProjectMessagePostAccess(membership);
  if (!access.ok) {
    return { ok: false, code: access.code };
  }
  return { ok: true, ownerUserId: project.ownerUserId, membership };
};
