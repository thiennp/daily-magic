import isRecord from "@/lib/agentWitch/isRecord";

export interface OfficialWorkflowHumanStepBody {
  readonly workflowRunId: string;
  readonly stepRunId: string;
  readonly response: string;
  readonly skipped?: boolean;
  readonly writerAgent?: string;
  readonly targetDeviceId?: string;
}

export const SKIPPED_HUMAN_STEP_RESPONSE = "Skipped by operator.";

export const parseOfficialWorkflowHumanStepBody = (
  body: unknown,
): OfficialWorkflowHumanStepBody | null => {
  if (!isRecord(body)) {
    return null;
  }

  const workflowRunId =
    typeof body.workflowRunId === "string" ? body.workflowRunId.trim() : "";
  const stepRunId =
    typeof body.stepRunId === "string" ? body.stepRunId.trim() : "";
  const skipped = body.skipped === true;
  const rawResponse = typeof body.response === "string" ? body.response : "";
  const response =
    skipped && rawResponse.trim().length === 0
      ? SKIPPED_HUMAN_STEP_RESPONSE
      : rawResponse;

  if (
    workflowRunId.length === 0 ||
    stepRunId.length === 0 ||
    response.trim().length === 0
  ) {
    return null;
  }

  return {
    workflowRunId,
    stepRunId,
    response,
    ...(skipped ? { skipped: true } : {}),
    ...(typeof body.writerAgent === "string" && body.writerAgent.length > 0
      ? { writerAgent: body.writerAgent }
      : {}),
    ...(typeof body.targetDeviceId === "string" &&
    body.targetDeviceId.length > 0
      ? { targetDeviceId: body.targetDeviceId }
      : {}),
  };
};

export default parseOfficialWorkflowHumanStepBody;
