import type WorkflowHumanStepPayload from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseWorkflowHumanStepPayload = (
  value: unknown,
): WorkflowHumanStepPayload | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }

  const stepRunId = typeof value.stepRunId === "string" ? value.stepRunId : "";
  const stepIndex = typeof value.stepIndex === "number" ? value.stepIndex : -1;
  const title = typeof value.title === "string" ? value.title : "";
  const instructions =
    typeof value.instructions === "string" ? value.instructions : "";

  if (
    stepRunId.length === 0 ||
    stepIndex < 0 ||
    title.length === 0 ||
    instructions.length === 0
  ) {
    return undefined;
  }

  return {
    stepRunId,
    stepIndex,
    title,
    instructions,
    ...(typeof value.totalSteps === "number" && value.totalSteps > 0
      ? { totalSteps: value.totalSteps }
      : {}),
    ...(value.allowSkip === true ? { allowSkip: true } : {}),
    ...(typeof value.priorAgentOutputPreview === "string" &&
    value.priorAgentOutputPreview.trim().length > 0
      ? { priorAgentOutputPreview: value.priorAgentOutputPreview }
      : {}),
    ...(typeof value.workflowLabel === "string" &&
    value.workflowLabel.trim().length > 0
      ? { workflowLabel: value.workflowLabel }
      : {}),
  };
};

export const parseWorkflowRunStepResponse = (
  data: unknown,
): WorkflowRunStepResponse | null => {
  if (!isRecord(data) || typeof data.ok !== "boolean") {
    return null;
  }

  const workflowRunId =
    typeof data.workflowRunId === "string" ? data.workflowRunId : undefined;
  const currentStep =
    typeof data.currentStep === "number" ? data.currentStep : undefined;
  const agentRunId =
    typeof data.agentRunId === "string" ? data.agentRunId : undefined;
  const humanStep = parseWorkflowHumanStepPayload(data.humanStep);
  const message = "message" in data ? data.message : undefined;

  return {
    ok: data.ok,
    ...(workflowRunId !== undefined ? { workflowRunId } : {}),
    ...(currentStep !== undefined ? { currentStep } : {}),
    ...(humanStep !== undefined ? { humanStep } : {}),
    ...(agentRunId !== undefined ? { agentRunId } : {}),
    ...(message !== undefined ? { message } : {}),
  };
};
