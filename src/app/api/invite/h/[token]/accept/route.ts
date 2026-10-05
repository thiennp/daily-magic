import {
  humanInviteAcceptStatusFor,
  humanInviteEmailLockErrorJson,
  humanInviteNamingErrorJson,
} from "@/app/api/invite/h/[token]/accept/humanInviteAcceptErrors";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly token: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { token } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const suggested =
    typeof payload.suggestedProjectDisplayName === "string"
      ? payload.suggestedProjectDisplayName
      : payload.suggestedProjectDisplayName === null
        ? null
        : undefined;

  const result = await redeemHumanProjectInvite({
    token,
    claimantUserId: actor.id,
    claimantEmail: actor.email,
    suggestedProjectDisplayName: suggested,
  });
  if (!result.ok) {
    if (
      result.code === "invite_email_mismatch" ||
      result.code === "invite_email_unverified"
    ) {
      return humanInviteEmailLockErrorJson(
        result.code,
        result.invitedEmailMasked,
      );
    }
    if (
      result.code === "display_name_taken" ||
      result.code === "display_name_invalid" ||
      result.code === "display_name_reserved" ||
      result.code === "display_name_required"
    ) {
      return humanInviteNamingErrorJson(
        result.code,
        result.suggestedProjectDisplayName,
      );
    }
    return projectAccessErrorJson(
      result.code,
      humanInviteAcceptStatusFor(result.code),
    );
  }
  return Response.json({
    ok: true,
    projectId: result.projectId,
    membershipId: result.membership.id,
    role: result.role,
    status: result.membership.status,
    projectDisplayName: result.projectDisplayName,
  });
}
