import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type RequireProjectIdForCreateResult =
  | { readonly ok: true; readonly projectId: string }
  | {
      readonly ok: false;
      readonly status: 400 | 403 | 404;
      readonly code: "project_required" | "forbidden" | "not_found";
      readonly error: string;
    };

/**
 * `writer` (default): the owner or an active member who is not a viewer (dispatch).
 * `owner`: the project owner only (Library items bound into the project's composition).
 */
export const requireProjectIdForCreate = async (input: {
  readonly actorUserId: string;
  readonly projectId: string | null | undefined;
  readonly requires?: "writer" | "owner";
}): Promise<RequireProjectIdForCreateResult> => {
  const projectId =
    typeof input.projectId === "string" ? input.projectId.trim() : "";

  if (projectId.length === 0) {
    return {
      ok: false,
      status: 400,
      code: "project_required",
      error: "project_id is required.",
    };
  }

  const membership = await checkProjectMembershipStatus(
    projectId,
    input.actorUserId,
  );

  if (membership === "owner") {
    return { ok: true, projectId };
  }
  if (membership === "active" && input.requires !== "owner") {
    const seat = await getActiveProjectMembership(projectId, input.actorUserId);
    if (seat !== null && seat.role !== "viewer") {
      return { ok: true, projectId };
    }
  }

  const project = await getUserProjectById(projectId);
  if (project === null) {
    return {
      ok: false,
      status: 404,
      code: "not_found",
      error: "Project not found.",
    };
  }

  return {
    ok: false,
    status: 403,
    code: "forbidden",
    error: "You do not have access to this project.",
  };
};

/** Library items bound into a project's composition: the project owner only. */
export const requireOwnerProjectIdForCreate = (input: {
  readonly actorUserId: string;
  readonly projectId: string | null | undefined;
}): Promise<RequireProjectIdForCreateResult> =>
  requireProjectIdForCreate({ ...input, requires: "owner" });
