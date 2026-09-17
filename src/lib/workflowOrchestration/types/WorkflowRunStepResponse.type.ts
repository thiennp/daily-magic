import type WorkflowHumanStepPayload from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

export default interface WorkflowRunStepResponse {
  readonly ok: boolean;
  readonly workflowRunId?: string;
  readonly currentStep?: number;
  readonly humanStep?: WorkflowHumanStepPayload;
  readonly agentRunId?: string;
  readonly message?: unknown;
}
