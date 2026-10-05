import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const statusFor = (code: string): number => {
  if (code === "already_owner" || code === "already_member") return 409;
  if (code === "expired" || code === "revoked" || code === "already_redeemed") {
    return 410;
  }
  if (code === "invalid_token" || code === "invalid_transition") return 404;
  return 400;
};

export async function POST(
  _request: Request,
  context: { params: Promise<{ readonly token: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { token } = await context.params;
  const result = await redeemHumanProjectInvite({
    token,
    claimantUserId: actor.id,
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusFor(result.code));
  }
  return Response.json({
    ok: true,
    projectId: result.projectId,
    membershipId: result.membership.id,
    role: result.role,
    status: result.membership.status,
  });
}
