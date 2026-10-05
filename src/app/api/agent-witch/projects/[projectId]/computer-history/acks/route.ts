import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { orchestrateProjectComputerHistory } from "@/lib/projects/acl/messaging/orchestrateProjectComputerHistory";
import { parseProjectMessageComputerAckBody } from "@/lib/projects/acl/messaging/parseProjectMessageComputerAckBody";
import { toProjectComputerHistoryResponse } from "@/lib/projects/acl/messaging/toProjectComputerHistoryResponse";

export const dynamic = "force-dynamic";

/**
 * computerAck(projectId, messageId) from the owner's project computer after it
 * saved the message locally. Idempotent: a repeat returns alreadyAcked.
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const body = parseProjectMessageComputerAckBody(
    await request.json().catch(() => null),
  );
  if (body === null) {
    return Response.json(
      { ok: false, errorMessage: "messageId is required." },
      { status: 400 },
    );
  }
  const { projectId } = await context.params;
  return toProjectComputerHistoryResponse(
    await orchestrateProjectComputerHistory({
      kind: "computer_ack",
      projectId: projectId.trim(),
      deviceId: auth.device.id,
      deviceUserId: auth.device.userId,
      messageId: body.messageId,
    }),
  );
}
