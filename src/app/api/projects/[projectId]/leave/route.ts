import { leaveProjectMembership } from "@/lib/projects/acl/leaveProjectMembership";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: {
    params: Promise<{
      readonly projectId: string;
    }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const result = await leaveProjectMembership({
    projectId,
    actorUserId: actor.id,
  });

  if (!result.ok) {
    const status =
      result.code === "not_found"
        ? 404
        : result.code === "owner" || result.code === "forbidden"
          ? 403
          : 409;
    const code =
      result.code === "owner" ? "owner_cannot_leave" : result.code;
    return projectAccessErrorJson(code, status);
  }

  return Response.json({
    ok: true,
    membership: result.membership,
    alreadyLeft: result.alreadyLeft ?? false,
    status: result.status,
  });
}
