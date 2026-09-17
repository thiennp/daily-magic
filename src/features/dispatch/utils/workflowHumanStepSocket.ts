import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const parseWorkflowHumanStepSocketMessage = (
  parsed: Record<string, unknown>,
  onHumanStepRequired: (request: WorkflowHumanStepRequest) => void,
): void => {
  if (
    parsed.type !== AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_HUMAN_STEP_REQUIRED ||
    !("payload" in parsed) ||
    !isRecord(parsed.payload)
  ) {
    return;
  }

  const payload = parsed.payload;
  const workflowRunId =
    typeof payload.workflowRunId === "string" ? payload.workflowRunId : "";
  const stepRunId =
    typeof payload.stepRunId === "string" ? payload.stepRunId : "";
  const stepIndex =
    typeof payload.stepIndex === "number" ? payload.stepIndex : -1;
  const title = typeof payload.title === "string" ? payload.title : "";
  const instructions =
    typeof payload.instructions === "string" ? payload.instructions : "";

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
  });
};
