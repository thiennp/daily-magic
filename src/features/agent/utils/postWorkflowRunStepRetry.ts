import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";
import { setWorkflowHumanStepPending } from "@/features/dispatch/public-api/presentation";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { parseWorkflowRunStepResponse } from "@/lib/workflowOrchestration/parseWorkflowRunStepResponse";

export async function postWorkflowRunStepRetry(input: {
  readonly workflowRunId: string;
  readonly writerAgent?: HarnessWriterAgent;
  readonly targetDeviceId?: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> {
  const httpResponse = await fetch("/api/workflow-runs/retry-step", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      workflowRunId: input.workflowRunId,
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
  }

  return { ok: true };
}
