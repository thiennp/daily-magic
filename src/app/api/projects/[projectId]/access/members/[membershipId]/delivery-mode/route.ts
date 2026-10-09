import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeMembershipEdit } from "@/lib/projects/acl/authorizeMembershipEdit";
import { changeProjectMembershipDeliveryMode } from "@/lib/projects/acl/changeProjectMembershipDeliveryMode";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    readonly projectId: string;
    readonly membershipId: string;
  }>;
};

const statusForCode = (code: string): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  if (code === "wake_link_required") return 409;
  return 400;
};

/**
 * PUT { deliveryMode: "webhook" | "poll" } — owner switches a member bot
 * between "Wakes up on its own" and "Checks on demand" without re-invite.
 */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, membershipId } = await context.params;
  const decision = await authorizeMembershipEdit({
    projectId,
    membershipId,
    actorUserId: actor.id,
  });
  if (!decision.ok) {
    return projectAccessErrorJson(decision.code, statusForCode(decision.code));
  }
  const body: unknown = await request.json().catch(() => null);
  const deliveryMode =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>).deliveryMode
      : undefined;
  const result = await changeProjectMembershipDeliveryMode({
    projectId,
    actorUserId: actor.id,
    target: { by: "member_row", membershipId },
    deliveryMode,
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusForCode(result.code));
  }
  return Response.json(result);
}
