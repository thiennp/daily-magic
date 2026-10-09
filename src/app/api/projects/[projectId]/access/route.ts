import { decorateBotClaim } from "@/lib/projects/acl/decorateBotClaim";
import { decorateBotManagement } from "@/lib/projects/acl/decorateBotManagement";
import { handleInviterAccessPatch } from "@/app/api/projects/[projectId]/access/handleInviterAccessPatch";
import { handleProjectAccessPatch } from "@/app/api/projects/[projectId]/access/patchAccessAction";
import { buildInviterPendingAccessViews } from "@/lib/projects/acl/approvalCard/buildInviterPendingAccessViews";
import { buildOwnerPendingAccessViews } from "@/lib/projects/acl/approvalCard/buildOwnerPendingAccessViews";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { loadEnrichedProjectAccessMembers } from "@/lib/projects/acl/loadEnrichedProjectAccessMembers";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
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

  const isOwner = access.kind === "owner";
  const members = await loadEnrichedProjectAccessMembers({
    projectId,
    isOwner,
    ownerUserId: access.project.ownerUserId,
    projectDeviceId: access.project.deviceId,
  });
  const claimDecorated = await decorateBotClaim(members, {
    userId: actor.id,
    canWrite: isOwner || access.membership.role === "member",
    ownerUserId: access.project.ownerUserId,
  });
  const { pendingRequests, expiredRequests } = isOwner
    ? await buildOwnerPendingAccessViews(projectId)
    : await buildInviterPendingAccessViews({ projectId, userId: actor.id });

  return Response.json({
    ok: true,
    project: { id: access.project.id, name: access.project.name },
    members: decorateBotManagement(claimDecorated, {
      userId: actor.id,
      isOwner,
    }),
    pendingRequests,
    expiredRequests,
    firstConnect: isOwner
      ? {
          role: PROJECT_ACL_FIRST_CONNECT.role,
          scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
          note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
        }
      : null,
    actorRole: isOwner ? "owner" : access.membership.role,
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
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  if (!decision.allow) {
    if (decision.reason === "not_found") {
      return projectAccessErrorJson(decision.reason, 404);
    }
    return handleInviterAccessPatch({
      projectId,
      actorUserId: actor.id,
      body: payload,
    });
  }
  return handleProjectAccessPatch({
    projectId,
    ownerUserId: actor.id,
    body: payload,
  });
}
