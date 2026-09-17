import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

export const collectPriorHumanResponsesFromWorkflowRun = (
  run: WorkflowRunRecord,
): Readonly<Record<string, string>> => {
  const entries = Object.entries(run.stepOutputs).flatMap(([key, value]) => {
    if (
      typeof value === "object" &&
      value !== null &&
      "response" in value &&
      typeof (value as { response: unknown }).response === "string"
    ) {
      return [[key, (value as { response: string }).response] as const];
    }
    return [];
  });
  return Object.fromEntries(entries);
};

export default collectPriorHumanResponsesFromWorkflowRun;
