import { isProjectConnectionsFeatureEnabled } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { projectConnectionsUnavailableJson } from "@/lib/projects/connections/projectConnectionsUnavailableJson";
import { handleLinearWebhook } from "@/lib/projects/taskSync/handleLinearWebhook";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * POST /api/projects/:projectId/connections/linear/webhook — called by Linear
 * (no session). Authenticated by the Linear-Signature HMAC over the raw body.
 */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  if (!isProjectConnectionsFeatureEnabled()) {
    return projectConnectionsUnavailableJson();
  }
  const { projectId } = await context.params;
  const rawBody = await request.text();
  try {
    const result = await handleLinearWebhook({
      projectId,
      rawBody,
      signature: request.headers.get("linear-signature"),
    });
    return Response.json(result.body, { status: result.status });
  } catch (error: unknown) {
    console.error("linear webhook failed", {
      projectId,
      message: error instanceof Error ? error.message : "webhook_failed",
    });
    return Response.json(
      { ok: false, code: "webhook_failed" },
      { status: 500 },
    );
  }
}
