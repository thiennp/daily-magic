import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { parseOfficialWorkflowRunStartBody } from "@/lib/workflowOrchestration/parseOfficialWorkflowRunStartBody";
import { startOfficialWorkflowRun } from "@/lib/workflowOrchestration/startOfficialWorkflowRun";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";

import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const WORKFLOW_RUN_FAILED_CODE = "workflow_run_failed";
const WORKFLOW_RUN_FAILED_ERROR = "Workflow run failed.";

/** Standard agent-access error shape ({ ok, error, code }) for a failed run step; keeps `message` for older callers. */
const toAgentAccessWorkflowError = (
  result: WorkflowRunStepResponse,
): AgentAccessToolCallResult =>
  agentAccessTextResult(
    {
      ...result,
      ok: false,
      error:
        typeof result.message === "string" && result.message.length > 0
          ? result.message
          : WORKFLOW_RUN_FAILED_ERROR,
      code: result.code ?? WORKFLOW_RUN_FAILED_CODE,
    },
    true,
  );

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

  if (!result.ok) {
    return toAgentAccessWorkflowError(result);
  }

  return agentAccessTextResult(result);
};
