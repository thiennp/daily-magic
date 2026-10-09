import { requireAuth } from "@/lib/auth/requireAuth";
import { listInviterRequestIds } from "@/lib/projects/acl/listInviterRequestIds";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { grokWebhookRouteStatusForCode } from "@/lib/projects/acl/webhooks/grokWebhookRouteStatusForCode";
import { writePendingRequestGrokWebhook } from "@/lib/projects/acl/webhooks/writePendingRequestGrokWebhook";

export const dynamic = "force-dynamic";

/**
 * PUT { webhookUrl, webhookKey }: the owner, or the member who invited it, pre-registers the wake link of a
 * pending assistant request (carried over on Approve). Key is never returned.
 */
export async function PUT(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly requestId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, requestId } = await context.params;
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    if (decision.reason === "not_found") {
      return projectAccessErrorJson(
        decision.reason,
        grokWebhookRouteStatusForCode(decision.reason),
      );
    }
    // A member sets the wake link only for the assistants they invited themselves.
    const seat = await resolveOwnerOrActiveHumanSeat({
      projectId,
      actorUserId: actor.id,
    });
    const mine = await listInviterRequestIds({
      projectId,
      userId: actor.id,
    });
    const allowed =
      seat.ok &&
      seat.kind === "human" &&
      seat.membership.role === "member" &&
      mine.has(requestId);
    if (!allowed) {
      return projectAccessErrorJson(
        "forbidden",
        grokWebhookRouteStatusForCode("forbidden"),
      );
    }
  }
  const body: unknown = await request.json().catch(() => null);
  const fields: Readonly<Record<string, unknown>> =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const result = await writePendingRequestGrokWebhook({
    projectId,
    requestId,
    grokWebhookUrl: fields.webhookUrl,
    grokWebhookBearer: fields.webhookKey,
  });
  if (!result.ok) {
    return projectAccessErrorJson(
      result.code,
      result.code === "not_pending"
        ? 409
        : grokWebhookRouteStatusForCode(result.code),
    );
  }
  return Response.json({ ok: true, grokWebhookRegistered: true, keySet: true });
}
