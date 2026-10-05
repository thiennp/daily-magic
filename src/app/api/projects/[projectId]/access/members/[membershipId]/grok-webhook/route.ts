import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwnerMember } from "@/lib/projects/acl/authorizeProjectOwnerMember";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import { toWebhookUrlHost } from "@/lib/projects/acl/webhooks/toWebhookUrlHost";
import { saveProjectMemberGrokRoutineWebhookAsOwner } from "@/lib/projects/acl/webhooks/saveProjectMemberGrokRoutineWebhookAsOwner";

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
  if (code === "naming_required") return 409;
  return 400;
};

/**
 * GET a member bot's Grok routine webhook status. Project owner only.
 * Returns host + registered flag. Never the URL path, never the key.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, membershipId } = await context.params;
  const auth = await authorizeProjectOwnerMember({
    projectId,
    membershipId,
    actorUserId: actor.id,
  });
  if (!auth.ok) {
    return projectAccessErrorJson(auth.code, statusForCode(auth.code));
  }
  const status = await readProjectGrokRoutineWebhookStatus({ membershipId });
  return Response.json({
    ok: true,
    grokWebhookRegistered: status.grokWebhookRegistered,
    grokWebhookUrlHost: status.grokWebhookUrlHost,
    keySet: status.grokWebhookRegistered,
  });
}

/**
 * PUT { webhookUrl, webhookKey } from the owner's secret form.
 * Same validation + storage as register_project_webhook (Grok routine path).
 * The key is stored once and never returned or logged.
 */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, membershipId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const fields =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const result = await saveProjectMemberGrokRoutineWebhookAsOwner({
    projectId,
    membershipId,
    actorUserId: actor.id,
    grokWebhookUrl: fields.webhookUrl,
    grokWebhookBearer: fields.webhookKey,
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusForCode(result.code));
  }
  return Response.json({
    ok: true,
    grokWebhookRegistered: true,
    grokWebhookUrlHost: toWebhookUrlHost(result.grokWebhookUrl),
    keySet: true,
  });
}
