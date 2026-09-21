import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";
import type { WorkflowStepFailureRequest } from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const readPayload = (
  parsed: Record<string, unknown>,
  expectedType: string,
): Record<string, unknown> | null =>
  parsed.type === expectedType && isRecord(parsed.payload)
    ? parsed.payload
    : null;

export const parseWorkflowHumanStepSocketMessage = (
  parsed: Record<string, unknown>,
  onHumanStepRequired: (request: WorkflowHumanStepRequest) => void,
): void => {
  const payload = readPayload(
    parsed,
    AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_HUMAN_STEP_REQUIRED,
  );
  if (payload === null) {
    return;
  }

  const workflowRunId = readString(payload.workflowRunId);
  const stepRunId = readString(payload.stepRunId);
  const stepIndex =
    typeof payload.stepIndex === "number" ? payload.stepIndex : -1;
  const title = readString(payload.title);
  const instructions = readString(payload.instructions);

  if (
    workflowRunId.length === 0 ||
    stepRunId.length === 0 ||
    stepIndex < 0 ||
    title.length === 0 ||
    instructions.length === 0
  ) {
    return;
  }

  onHumanStepRequired({
    workflowRunId,
    stepRunId,
    stepIndex,
    title,
    instructions,
    ...(typeof payload.totalSteps === "number" && payload.totalSteps > 0
      ? { totalSteps: payload.totalSteps }
      : {}),
    ...(payload.allowSkip === true ? { allowSkip: true } : {}),
    ...(readString(payload.priorAgentOutputPreview).trim().length > 0
      ? {
          priorAgentOutputPreview: readString(payload.priorAgentOutputPreview),
        }
      : {}),
  });
};

export const parseWorkflowStepFailedSocketMessage = (
  parsed: Record<string, unknown>,
  onStepFailed: (request: WorkflowStepFailureRequest) => void,
): void => {
  const payload = readPayload(
    parsed,
    AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_STEP_FAILED,
  );
  if (payload === null) {
    return;
  }

  const workflowRunId = readString(payload.workflowRunId);
  const stepRunId = readString(payload.stepRunId);
  const stepIndex =
    typeof payload.stepIndex === "number" ? payload.stepIndex : -1;
  const title = readString(payload.title);
  const errorMessage = readString(payload.errorMessage);

  if (workflowRunId.length === 0 || stepIndex < 0 || title.length === 0) {
    return;
  }

  onStepFailed({
    workflowRunId,
    stepRunId,
    stepIndex,
    title,
    errorMessage:
      errorMessage.length > 0 ? errorMessage : "Agent step failed on your Mac.",
  });
};
