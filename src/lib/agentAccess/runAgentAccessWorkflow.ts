import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { parseOfficialWorkflowRunStartBody } from "@/lib/workflowOrchestration/parseOfficialWorkflowRunStartBody";
import { startOfficialWorkflowRun } from "@/lib/workflowOrchestration/startOfficialWorkflowRun";

import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

export const runAgentAccessWorkflow = async (
  actor: AgentAccessActor,
  args: unknown,
): Promise<AgentAccessToolCallResult> => {
  const parsed = parseOfficialWorkflowRunStartBody(args);

  if (parsed === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "capabilityId and fieldValues are required.",
        code: "invalid_arguments",
      },
      true,
    );
  }

  const result = await startOfficialWorkflowRun({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    capabilityId: parsed.capabilityId,
    fieldValues: parsed.fieldValues,
    dispatchBodyBase: {
      ...(parsed.targetDeviceId !== undefined
        ? { targetDeviceId: parsed.targetDeviceId }
        : {}),
    },
  });

  return agentAccessTextResult(result, !result.ok);
};
