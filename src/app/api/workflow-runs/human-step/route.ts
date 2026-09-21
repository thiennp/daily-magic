import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { requireAuth } from "@/lib/auth/requireAuth";
import { completeOfficialWorkflowHumanStep } from "@/lib/workflowOrchestration/completeOfficialWorkflowHumanStep";
import { parseOfficialWorkflowHumanStepBody } from "@/lib/workflowOrchestration/parseOfficialWorkflowHumanStepBody";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseOfficialWorkflowHumanStepBody(body);

  if (parsed === null) {
    return Response.json(
      {
        ok: false,
        message: "workflowRunId, stepRunId, and response are required.",
      },
      { status: 400 },
    );
  }

  const writerAgent =
    typeof parsed.writerAgent === "string" &&
    isHarnessWriterAgent(parsed.writerAgent)
      ? parsed.writerAgent
      : undefined;

  const result = await completeOfficialWorkflowHumanStep({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    workflowRunId: parsed.workflowRunId,
    stepRunId: parsed.stepRunId,
    response: parsed.response,
    ...(parsed.skipped === true ? { skipped: true } : {}),
    dispatchBodyBase: {
      ...(writerAgent !== undefined ? { writerAgent } : {}),
      ...(parsed.targetDeviceId !== undefined
        ? { targetDeviceId: parsed.targetDeviceId }
        : {}),
    },
  });

  return Response.json(result, { status: result.ok ? 200 : 400 });
}
