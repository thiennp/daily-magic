import { handleProjectAccessPatch } from "@/app/api/projects/[projectId]/access/patchAccessAction";
import {
  buildMembershipViews,
  buildPendingRequestViews,
} from "@/lib/projects/acl/buildProjectAccessViews";
import { listPendingProjectAccessRequests } from "@/lib/projects/acl/listPendingProjectAccessRequests";
import { listProjectMembershipsForProject } from "@/lib/projects/acl/listProjectMembershipsForProject";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId);
  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const [memberRows, pendingRows] = await Promise.all([
    listProjectMembershipsForProject(projectId),
    listPendingProjectAccessRequests(projectId),
  ]);
  const [members, pendingRequests] = await Promise.all([
    buildMembershipViews(memberRows),
    buildPendingRequestViews(pendingRows),
  ]);

  return Response.json({
    ok: true,
    project: { id: project.id, name: project.name },
    members,
    pendingRequests,
    firstConnect: {
      role: PROJECT_ACL_FIRST_CONNECT.role,
      scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
      note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
    },
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  return handleProjectAccessPatch({
    projectId,
    ownerUserId: actor.id,
    body: payload,
  });
}
