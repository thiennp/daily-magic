import { requireAuth } from "@/lib/auth/requireAuth";
import { approveHumanInviteRequest } from "@/lib/projects/acl/humanInvites/approveHumanInviteRequest";
import { humanInviteEmailErrorJson } from "@/lib/projects/acl/humanInvites/humanInviteEmailErrorJson";

export const dynamic = "force-dynamic";

/** Owner Approve for a human invite in status 'accepted' (Wants to join). */
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
  const result = await approveHumanInviteRequest({
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
    membershipId: result.membership.id,
    status: "approved",
  });
}
