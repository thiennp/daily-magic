import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { setBotInviter } from "@/lib/projects/acl/setBotInviter";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** PUT { inviterUserId? } — claim an assistant (default: you) or change who invited it. */
export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      readonly projectId: string;
      readonly membershipId: string;
    }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, membershipId } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const inviterUserId =
    body !== null &&
    typeof body === "object" &&
    typeof (body as { inviterUserId?: unknown }).inviterUserId === "string"
      ? (body as { inviterUserId: string }).inviterUserId
      : null;
  const result = await setBotInviter({
    projectId,
    membershipId,
    actorUserId: actor.id,
    inviterUserId,
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
  return Response.json({ ok: true });
}
