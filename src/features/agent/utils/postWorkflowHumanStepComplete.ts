import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";
import { setWorkflowHumanStepPending } from "@/features/dispatch/utils/workflowHumanStepPendingStore";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { parseWorkflowRunStepResponse } from "@/lib/workflowOrchestration/parseWorkflowRunStepResponse";

export async function postWorkflowHumanStepComplete(input: {
  readonly workflowRunId: string;
  readonly stepRunId: string;
  readonly response: string;
  readonly skipped?: boolean;
  readonly writerAgent?: HarnessWriterAgent;
  readonly targetDeviceId?: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> {
  const httpResponse = await fetch("/api/workflow-runs/human-step", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      workflowRunId: input.workflowRunId,
      stepRunId: input.stepRunId,
      response: input.response,
      ...(input.skipped === true ? { skipped: true } : {}),
      ...(input.writerAgent !== undefined
        ? { writerAgent: input.writerAgent }
        : {}),
      ...(input.targetDeviceId !== undefined && input.targetDeviceId.length > 0
        ? { targetDeviceId: input.targetDeviceId }
        : {}),
    }),
  });

  const data: unknown = await httpResponse.json().catch(() => null);
  const parsed = parseWorkflowRunStepResponse(data);

  if (parsed === null || !parsed.ok) {
    return {
      ok: false,
      errorMessage: readDispatchHttpResponseError(data, httpResponse.status),
    };
  }

  if (parsed.humanStep !== undefined && parsed.workflowRunId !== undefined) {
    setWorkflowHumanStepPending({
      workflowRunId: parsed.workflowRunId,
      ...parsed.humanStep,
    });
  } else {
    setWorkflowHumanStepPending(null);
  }

  return { ok: true };
}
