import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { orchestrateProjectComputerHistory } from "@/lib/projects/acl/messaging/orchestrateProjectComputerHistory";
import { parseProjectComputerHistoryReportBody } from "@/lib/projects/acl/messaging/parseProjectComputerHistoryReportBody";
import { toProjectComputerHistoryResponse } from "@/lib/projects/acl/messaging/toProjectComputerHistoryResponse";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/** Owner's project computer: state plus messages still without a computerAck. */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId } = await context.params;
  return toProjectComputerHistoryResponse(
    await orchestrateProjectComputerHistory({
      kind: "computer_read",
      projectId: projectId.trim(),
      deviceId: auth.device.id,
      deviceUserId: auth.device.userId,
    }),
  );
}

/** Owner's project computer: body `{ report: "ready" | "degraded" }`. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const body = parseProjectComputerHistoryReportBody(
    await request.json().catch(() => null),
  );
  if (body === null) {
    return Response.json(
      { ok: false, errorMessage: 'report must be "ready" or "degraded".' },
      { status: 400 },
    );
  }
  const { projectId } = await context.params;
  return toProjectComputerHistoryResponse(
    await orchestrateProjectComputerHistory({
      kind: "computer_report",
      projectId: projectId.trim(),
      deviceId: auth.device.id,
      deviceUserId: auth.device.userId,
      report: body.report,
    }),
  );
}
