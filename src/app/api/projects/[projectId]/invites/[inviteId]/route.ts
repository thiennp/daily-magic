import { revokeProjectInvite } from "@/lib/projects/acl/invites/revokeProjectInvite";
import { updateProjectInviteAutoApprove } from "@/lib/projects/acl/invites/updateProjectInviteAutoApprove";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly inviteId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, inviteId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  if (typeof payload.autoApprove !== "boolean") {
    return projectAccessErrorJson("invalid", 400);
  }
  const result = await updateProjectInviteAutoApprove({
    projectId,
    inviteId,
    ownerUserId: actor.id,
    autoApprove: payload.autoApprove,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : 409;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({
    inviteId: result.invite.id,
    autoApprove: result.invite.autoApprove,
  });
}

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly inviteId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, inviteId } = await context.params;
  const result = await revokeProjectInvite({
    projectId,
    inviteId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : 409;
    return projectAccessErrorJson(result.code, status);
  }
  return new Response(null, { status: 204 });
}
