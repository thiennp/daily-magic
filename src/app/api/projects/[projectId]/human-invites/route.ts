import { issueHumanProjectInvite } from "@/lib/projects/acl/humanInvites/issueHumanProjectInvite";
import { listHumanProjectInvites } from "@/lib/projects/acl/humanInvites/listHumanProjectInvites";
import { toHumanInviteListItem } from "@/lib/projects/acl/humanInvites/toHumanInviteListItem";
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
  const result = await listHumanProjectInvites({
    projectId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    const status = result.code === "forbidden" ? 403 : 404;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json({
    invites: result.invites.map(toHumanInviteListItem),
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
  const result = await issueHumanProjectInvite({
    projectId,
    ownerUserId: actor.id,
    role: payload.role,
    email: payload.email,
    expiresInDays: payload.expiresInDays,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden"
        ? 403
        : result.code === "not_found"
          ? 404
          : 400;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json(
    {
      inviteId: result.invite.id,
      url: result.url,
      token: result.token,
      role: result.invite.role,
      email: result.invite.email,
      expiresAt: result.invite.expiresAt,
      maxUses: result.invite.maxUses,
      usesRemaining: result.invite.usesRemaining,
    },
    { status: 201 },
  );
}
