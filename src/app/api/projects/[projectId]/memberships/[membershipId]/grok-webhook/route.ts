import { requireAuth } from "@/lib/auth/requireAuth";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import type { ProjectGrokWebhookTarget } from "@/lib/projects/acl/webhooks/projectGrokWebhookTarget";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import { toGrokWebhookStatusView } from "@/lib/projects/acl/webhooks/toGrokWebhookStatusView";
import { writeProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

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

/** Signed-in bot owner → owned_bot_row target (SQL proves ownership). */
const ownedBotTarget = async (
  context: RouteContext,
): Promise<
  | { readonly target: ProjectGrokWebhookTarget; readonly denied: null }
  | { readonly target: null; readonly denied: Response }
> => {
  const { actor, error } = await requireAuth();
  if (error || !actor) return { target: null, denied: error };
  const { projectId, membershipId } = await context.params;
  return {
    target: {
      projectId,
      by: "owned_bot_row",
      membershipId,
      ownerUserId: actor.id,
    },
    denied: null,
  };
};

/** GET webhook status for a membership whose bot the signed-in person owns. */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { target, denied } = await ownedBotTarget(context);
  if (target === null) return denied;
  const status = await readProjectGrokRoutineWebhookStatus(target);
  if (status === null) {
    return projectAccessErrorJson("not_found", 404);
  }
  return Response.json({
    ok: true,
    ...toGrokWebhookStatusView(status.grokWebhookUrl),
  });
}

/**
 * PUT { webhookUrl, webhookKey } from the My-bots secret form.
 * Key stored once, never returned. Guarded by owned_bot_row SQL.
 */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { target, denied } = await ownedBotTarget(context);
  if (target === null) return denied;
  const body: unknown = await request.json().catch(() => null);
  const fields: Readonly<Record<string, unknown>> =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const result = await writeProjectGrokRoutineWebhook({
    target,
    grokWebhookUrl: fields.webhookUrl,
    grokWebhookBearer: fields.webhookKey,
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusForCode(result.code));
  }
  return Response.json({
    ok: true,
    ...toGrokWebhookStatusView(result.grokWebhookUrl),
  });
}
