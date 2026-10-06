import { createProjectInvite } from "@/lib/projects/acl/invites/createProjectInvite";
import { listProjectInvites } from "@/lib/projects/acl/invites/listProjectInvites";
import { toInviteListItem } from "@/lib/projects/acl/invites/toInviteListItem";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
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
  const result = await listProjectInvites({
    projectId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    const status = result.code === "forbidden" ? 403 : 404;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({
    invites: result.invites.map(toInviteListItem),
  });
}

export async function POST(
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

  const result = await createProjectInvite({
    projectId,
    ownerUserId: actor.id,
    teamLabel:
      typeof payload.teamLabel === "string" ? payload.teamLabel : null,
    scopes: payload.scopes,
    maxUses: payload.maxUses,
    expiresInDays: payload.expiresInDays,
    autoApprove: payload.autoApprove === true,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden" ? 403 : result.code === "not_found" ? 404 : 400;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json(
    {
      inviteId: result.invite.id,
      url: result.url,
      token: result.token,
      expiresAt: result.invite.expiresAt,
      maxUses: result.invite.maxUses,
      usesRemaining: result.invite.usesRemaining,
      teamLabel: result.invite.teamLabel,
      scopes: [...result.invite.scopes],
      autoApprove: result.invite.autoApprove,
    },
    { status: 201 },
  );
}
