import { revokeProjectInvite } from "@/lib/projects/acl/invites/revokeProjectInvite";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

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
    return Response.json({ ok: false, errorMessage: result.code }, { status });
  }
  return new Response(null, { status: 204 });
}
