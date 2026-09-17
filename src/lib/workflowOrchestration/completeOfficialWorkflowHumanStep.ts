import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import {
  completeWorkflowStepRun,
  getWorkflowRunById,
  getWorkflowStepRunById,
  updateWorkflowRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const completeOfficialWorkflowHumanStep = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly workflowRunId: string;
  readonly stepRunId: string;
  readonly response: string;
  readonly dispatchBodyBase: Omit<
    AgentRunDispatchBody,
    "prompt" | "capabilityId"
  >;
}): Promise<WorkflowRunStepResponse> => {
  const run = await getWorkflowRunById(input.workflowRunId);
  if (run === null || run.requesterUserId !== input.requesterUserId) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Workflow run not found.",
    });
  }

  const step = await getWorkflowStepRunById(input.stepRunId);
  if (
    step === null ||
    step.workflowRunId !== run.id ||
    step.nodeKind !== "human"
  ) {
    return buildWorkflowRunStepResponse({
      ok: false,
      message: "Workflow step not found.",
    });
  }

  await completeWorkflowStepRun(step.id, {
    status: "completed",
    output: { response: input.response.trim() },
  });

  const stepOutputs = {
    ...run.stepOutputs,
    [step.nodeId]: { response: input.response.trim() },
  };

  const nextIndex = run.currentStepIndex + 1;
  await updateWorkflowRunRecord(run.id, {
    status: "running",
    currentStepIndex: nextIndex,
    stepOutputs,
  });

  return continueOfficialWorkflowRun({
    runtime: input.runtime,
    workflowRunId: run.id,
    requesterUserId: input.requesterUserId,
    requesterEmail: input.requesterEmail,
    dispatchBodyBase: {
      ...input.dispatchBodyBase,
      capabilityId: run.capabilityId,
    },
  });
};

export default completeOfficialWorkflowHumanStep;
