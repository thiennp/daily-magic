import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import isRecord from "@/lib/agentWitch/isRecord";
import { requireAuth } from "@/lib/auth/requireAuth";
import { retryOfficialWorkflowRunStep } from "@/lib/workflowOrchestration/retryOfficialWorkflowRunStep";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const workflowRunId =
    isRecord(body) && typeof body.workflowRunId === "string"
      ? body.workflowRunId.trim()
      : "";

  if (workflowRunId.length === 0) {
    return Response.json(
      { ok: false, message: "workflowRunId is required." },
      { status: 400 },
    );
  }

  const writerAgent =
    isRecord(body) &&
    typeof body.writerAgent === "string" &&
    isHarnessWriterAgent(body.writerAgent)
      ? body.writerAgent
      : undefined;
  const targetDeviceId =
    isRecord(body) &&
    typeof body.targetDeviceId === "string" &&
    body.targetDeviceId.length > 0
      ? body.targetDeviceId
      : undefined;

  const result = await retryOfficialWorkflowRunStep({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    workflowRunId,
    dispatchBodyBase: {
      ...(writerAgent !== undefined ? { writerAgent } : {}),
      ...(targetDeviceId !== undefined ? { targetDeviceId } : {}),
    },
  });

  return Response.json(result, { status: result.ok ? 200 : 400 });
}
