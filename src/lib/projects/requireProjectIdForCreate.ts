import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type RequireProjectIdForCreateResult =
  | { readonly ok: true; readonly projectId: string }
  | {
      readonly ok: false;
      readonly status: 400 | 403 | 404;
      readonly code: "project_required" | "forbidden" | "not_found";
      readonly error: string;
    };

export const requireProjectIdForCreate = async (input: {
  readonly actorUserId: string;
  readonly projectId: string | null | undefined;
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

  if (membership === "owner" || membership === "active") {
    return { ok: true, projectId };
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
