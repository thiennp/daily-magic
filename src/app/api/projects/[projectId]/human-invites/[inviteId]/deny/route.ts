import { requireAuth } from "@/lib/auth/requireAuth";
import { denyHumanInviteRequest } from "@/lib/projects/acl/humanInvites/denyHumanInviteRequest";
import { humanInviteEmailErrorJson } from "@/lib/projects/acl/humanInvites/humanInviteEmailErrorJson";

export const dynamic = "force-dynamic";

/** Owner Deny for a human invite in status 'accepted'. No membership is created. */
export async function POST(
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
  const result = await denyHumanInviteRequest({
    projectId,
    inviteId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    return humanInviteEmailErrorJson(result.code);
  }
  return Response.json({
    ok: true,
    inviteId: result.invite.id,
    status: "revoked",
  });
}
