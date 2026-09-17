import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { requireAuth } from "@/lib/auth/requireAuth";
import { parseOfficialWorkflowRunStartBody } from "@/lib/workflowOrchestration/parseOfficialWorkflowRunStartBody";
import { startOfficialWorkflowRun } from "@/lib/workflowOrchestration/startOfficialWorkflowRun";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseOfficialWorkflowRunStartBody(body);

  if (parsed === null) {
    return Response.json(
      { ok: false, message: "capabilityId and fieldValues are required." },
      { status: 400 },
    );
  }

  const result = await startOfficialWorkflowRun({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    capabilityId: parsed.capabilityId,
    fieldValues: parsed.fieldValues,
    dispatchBodyBase: {
      ...(parsed.writerAgent !== undefined
        ? { writerAgent: parsed.writerAgent }
        : {}),
      ...(parsed.targetUserId !== undefined
        ? { targetUserId: parsed.targetUserId }
        : {}),
      ...(parsed.groupId !== undefined ? { groupId: parsed.groupId } : {}),
      ...(parsed.targetDeviceId !== undefined
        ? { targetDeviceId: parsed.targetDeviceId }
        : {}),
    },
  });

  return Response.json(result, { status: result.ok ? 200 : 400 });
}
