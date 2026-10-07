import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { grokWebhookRouteStatusForCode } from "@/lib/projects/acl/webhooks/grokWebhookRouteStatusForCode";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import { readProjectMembershipHmacWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectMembershipHmacWebhookStatus";
import { resolveOwnerGrokWebhookTarget } from "@/lib/projects/acl/webhooks/resolveOwnerGrokWebhookTarget";
import {
  toGrokWakeHealthView,
  type GrokWakeHealthView,
} from "@/lib/projects/acl/webhooks/toGrokWakeHealthView";
import {
  toGrokWebhookStatusView,
  type GrokWebhookStatusView,
} from "@/lib/projects/acl/webhooks/toGrokWebhookStatusView";
import {
  toHmacWebhookStatusView,
  type HmacWebhookStatusView,
} from "@/lib/projects/acl/webhooks/toHmacWebhookStatusView";
import { writeProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    readonly projectId: string;
    readonly membershipId: string;
  }>;
};

/** GET 200 body: host + flags + last wake meta. Never a URL path, key, secret or response body. */
type OwnerGrokWebhookGetBody = { readonly ok: true } & GrokWebhookStatusView &
  HmacWebhookStatusView &
  GrokWakeHealthView;

/**
 * GET a member bot's webhook status. Project owner only. Host + flags, plus
 * lastWakeAt / lastFailureReason (DF-036); never secrets.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { target, denied } = await resolveOwnerGrokWebhookTarget(
    context.params,
  );
  if (target === null) return denied;
  const status = await readProjectGrokRoutineWebhookStatus(target);
  if (status === null) {
    return projectAccessErrorJson("not_found", 404);
  }
  const hmac = (await readProjectMembershipHmacWebhookStatus(target)) ?? {
    hmacWebhookUrl: null,
    secretSet: false,
  };
  const body: OwnerGrokWebhookGetBody = {
    ok: true,
    ...toGrokWebhookStatusView(status.grokWebhookUrl),
    ...toHmacWebhookStatusView(hmac),
    ...toGrokWakeHealthView(status),
  };
  return Response.json(body);
}

/**
 * PUT { webhookUrl, webhookKey } from the owner's secret form. Same save step as
 * register_project_webhook. The key is stored once and never returned or logged.
 */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { target, denied } = await resolveOwnerGrokWebhookTarget(
    context.params,
  );
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
    return projectAccessErrorJson(
      result.code,
      grokWebhookRouteStatusForCode(result.code),
    );
  }
  const hmac = (await readProjectMembershipHmacWebhookStatus(target)) ?? {
    hmacWebhookUrl: null,
    secretSet: false,
  };
  return Response.json({
    ok: true,
    ...toGrokWebhookStatusView(result.grokWebhookUrl),
    ...toHmacWebhookStatusView(hmac),
    deliveryModeFlipped: result.deliveryModeFlipped,
  });
}
