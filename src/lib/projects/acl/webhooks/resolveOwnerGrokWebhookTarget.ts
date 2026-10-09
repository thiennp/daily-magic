import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeMembershipEdit } from "@/lib/projects/acl/authorizeMembershipEdit";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { grokWebhookRouteStatusForCode } from "@/lib/projects/acl/webhooks/grokWebhookRouteStatusForCode";
import type { ProjectGrokWebhookTarget } from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";

/** Signed in + may edit this seat (its inviter; owner for people/computers) → an active member row of THIS project. */
export const resolveOwnerGrokWebhookTarget = async (
  params: Promise<{
    readonly projectId: string;
    readonly membershipId: string;
  }>,
): Promise<
  | { readonly target: ProjectGrokWebhookTarget; readonly denied: null }
  | { readonly target: null; readonly denied: Response }
> => {
  const { actor, error } = await requireAuth();
  if (error || !actor) return { target: null, denied: error };
  const { projectId, membershipId } = await params;
  const decision = await authorizeMembershipEdit({
    projectId,
    membershipId,
    actorUserId: actor.id,
  });
  if (!decision.ok) {
    return {
      target: null,
      denied: projectAccessErrorJson(
        decision.code,
        grokWebhookRouteStatusForCode(decision.code),
      ),
    };
  }
  return {
    target: { projectId, by: "member_row", membershipId },
    denied: null,
  };
};
