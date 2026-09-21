import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import {
  getWorkflowRunById,
  updateWorkflowRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const retryOfficialWorkflowRunStep = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly workflowRunId: string;
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

  if (run.status !== "failed") {
    return buildWorkflowRunStepResponse({
      ok: false,
      workflowRunId: run.id,
      currentStep: run.currentStepIndex,
      message: `Only a failed workflow can be retried (status: ${run.status}).`,
    });
  }

  await updateWorkflowRunRecord(run.id, {
    status: "running",
    errorMessage: null,
  });

  return continueOfficialWorkflowRun({
    runtime: input.runtime,
    workflowRunId: run.id,
    requesterUserId: input.requesterUserId,
    requesterEmail: input.requesterEmail,
    dispatchBodyBase: {
      ...input.dispatchBodyBase,
      capabilityId: run.capabilityId,
      ...(input.dispatchBodyBase.targetDeviceId === undefined &&
      run.deviceId !== null
        ? { targetDeviceId: run.deviceId }
        : {}),
    },
  });
};

export default retryOfficialWorkflowRunStep;
