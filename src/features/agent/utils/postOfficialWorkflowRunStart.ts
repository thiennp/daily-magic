import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";
import { setWorkflowHumanStepPending } from "@/features/dispatch/utils/workflowHumanStepPendingStore";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { parseWorkflowRunStepResponse } from "@/lib/workflowOrchestration/parseWorkflowRunStepResponse";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const buildDispatchErrorRaw = (errorMessage: string): string =>
  JSON.stringify({
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: { errorMessage },
  });

const applyHumanStepFromResponse = (
  parsed: ReturnType<typeof parseWorkflowRunStepResponse>,
): void => {
  if (
    parsed === null ||
    parsed.humanStep === undefined ||
    parsed.workflowRunId === undefined
  ) {
    return;
  }

  setWorkflowHumanStepPending({
    workflowRunId: parsed.workflowRunId,
    ...parsed.humanStep,
  });
};

export async function postOfficialWorkflowRunStart(input: {
  readonly capabilityId: string;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly writerAgent?: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly targetDeviceId?: string;
}): Promise<string> {
  const response = await fetch("/api/workflow-runs/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      capabilityId: input.capabilityId,
      fieldValues: input.fieldValues,
      ...(input.writerAgent !== undefined
        ? { writerAgent: input.writerAgent }
        : {}),
      ...(input.targetUserId !== undefined
        ? { targetUserId: input.targetUserId }
        : {}),
      ...(input.groupId !== undefined ? { groupId: input.groupId } : {}),
      ...(input.targetDeviceId !== undefined
        ? { targetDeviceId: input.targetDeviceId }
        : {}),
    }),
  });

  const data: unknown = await response.json().catch(() => null);
  const parsed = parseWorkflowRunStepResponse(data);

  if (parsed === null) {
    return buildDispatchErrorRaw(
      readDispatchHttpResponseError(data, response.status),
    );
  }

  if (!parsed.ok) {
    return buildDispatchErrorRaw(
      readDispatchHttpResponseError(data, response.status),
    );
  }

  applyHumanStepFromResponse(parsed);

  if (parsed.message !== undefined && typeof parsed.message === "object") {
    return JSON.stringify(parsed.message);
  }

  return JSON.stringify({
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      workflowRunId: parsed.workflowRunId ?? "",
      agentRunId: parsed.agentRunId ?? "",
    },
  });
}
