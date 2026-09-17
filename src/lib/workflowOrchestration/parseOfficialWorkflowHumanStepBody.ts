import isRecord from "@/lib/agentWitch/isRecord";

export interface OfficialWorkflowHumanStepBody {
  readonly workflowRunId: string;
  readonly stepRunId: string;
  readonly response: string;
  readonly writerAgent?: string;
  readonly targetDeviceId?: string;
}

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
  const response = typeof body.response === "string" ? body.response : "";

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
    ...(typeof body.targetDeviceId === "string" &&
    body.targetDeviceId.length > 0
      ? { targetDeviceId: body.targetDeviceId }
      : {}),
  };
};

export default parseOfficialWorkflowHumanStepBody;
