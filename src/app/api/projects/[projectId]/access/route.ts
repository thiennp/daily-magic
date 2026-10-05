import { handleProjectAccessPatch } from "@/app/api/projects/[projectId]/access/patchAccessAction";
import {
  buildMembershipViews,
  buildPendingRequestViews,
} from "@/lib/projects/acl/buildProjectAccessViews";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { enrichProjectAccessComputerMembers } from "@/lib/projects/acl/enrichProjectAccessComputerMembers";
import { listPendingProjectAccessRequests } from "@/lib/projects/acl/listPendingProjectAccessRequests";
import { listProjectMembershipsForProject } from "@/lib/projects/acl/listProjectMembershipsForProject";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
import { resolveAccessComputerLiveDeviceIds } from "@/lib/projects/acl/resolveAccessComputerLiveDeviceIds";
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
  const access = await resolveOwnerOrActiveHumanSeat({
    projectId,
    actorUserId: actor.id,
  });
  if (!access.ok) {
    const status = access.code === "not_found" ? 404 : 403;
    return Response.json(
      {
        ok: false,
        errorMessage:
          access.code === "not_found" ? "Project not found." : "forbidden",
      },
      { status },
    );
  }

  const memberRows = await listProjectMembershipsForProject(projectId);
  const baseMembers = await buildMembershipViews(memberRows);
  const liveDeviceIds = await resolveAccessComputerLiveDeviceIds(baseMembers);
  const members = await enrichProjectAccessComputerMembers(
    baseMembers,
    liveDeviceIds,
  );
  const pendingRequests =
    access.kind === "owner"
      ? await buildPendingRequestViews(
          await listPendingProjectAccessRequests(projectId),
        )
      : [];

  return Response.json({
    ok: true,
    project: { id: access.project.id, name: access.project.name },
    members,
    pendingRequests,
    firstConnect:
      access.kind === "owner"
        ? {
            role: PROJECT_ACL_FIRST_CONNECT.role,
            scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
            note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
          }
        : null,
    actorRole: access.kind === "owner" ? "owner" : access.membership.role,
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
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    const status = decision.reason === "not_found" ? 404 : 403;
    return projectAccessErrorJson(decision.reason, status);
  }
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
