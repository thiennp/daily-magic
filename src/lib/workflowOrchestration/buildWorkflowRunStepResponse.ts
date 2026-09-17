import type WorkflowHumanStepPayload from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";

export const buildWorkflowRunStepResponse = (input: {
  readonly ok: boolean;
  readonly workflowRunId?: string;
  readonly currentStep?: number;
  readonly humanStep?: WorkflowHumanStepPayload;
  readonly agentRunId?: string;
  readonly message?: string;
}): WorkflowRunStepResponse => ({
  ok: input.ok,
  ...(input.workflowRunId !== undefined
    ? { workflowRunId: input.workflowRunId }
    : {}),
  ...(input.currentStep !== undefined
    ? { currentStep: input.currentStep }
    : {}),
  ...(input.humanStep !== undefined ? { humanStep: input.humanStep } : {}),
  ...(input.agentRunId !== undefined ? { agentRunId: input.agentRunId } : {}),
  ...(input.message !== undefined ? { message: input.message } : {}),
});

export default buildWorkflowRunStepResponse;
