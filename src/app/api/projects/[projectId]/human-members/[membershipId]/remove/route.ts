import { removeHumanProjectMembership } from "@/lib/projects/acl/humanInvites/removeHumanProjectMembership";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
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
  const result = await removeHumanProjectMembership({
    projectId,
    membershipId,
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
  return Response.json({
    ok: true,
    membershipId: result.membership.id,
    status: result.membership.status,
  });
}
