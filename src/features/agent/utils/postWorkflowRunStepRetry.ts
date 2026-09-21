import { readDispatchHttpResponseError } from "@/features/agent/utils/readDispatchHttpResponseError";
import { setWorkflowHumanStepPending } from "@/features/dispatch/utils/workflowHumanStepPendingStore";
import { parseWorkflowRunStepResponse } from "@/lib/workflowOrchestration/parseWorkflowRunStepResponse";

export async function postWorkflowRunStepRetry(input: {
  readonly workflowRunId: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> {
  const httpResponse = await fetch("/api/workflow-runs/retry-step", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workflowRunId: input.workflowRunId }),
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
