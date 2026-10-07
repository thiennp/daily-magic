import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { grokWebhookRouteStatusForCode } from "@/lib/projects/acl/webhooks/grokWebhookRouteStatusForCode";
import type { ProjectGrokWebhookTarget } from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";

/** Signed in + owns the project → the condition: an active member row of THIS project. */
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
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    return {
      target: null,
      denied: projectAccessErrorJson(
        decision.reason,
        grokWebhookRouteStatusForCode(decision.reason),
      ),
    };
  }
  return {
    target: { projectId, by: "member_row", membershipId },
    denied: null,
  };
};
