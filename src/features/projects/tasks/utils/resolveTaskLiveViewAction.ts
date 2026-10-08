import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";

/**
 * afae8216: a running task re-opens its live floater; a failed or timed-out
 * one opens it on the ended run, where Retry lives. Others get no button.
 */
export const resolveTaskLiveViewAction = (input: {
  readonly status: ProjectTaskDisplayStatus;
  readonly agentRunId: string | null | undefined;
}): { readonly runId: string; readonly label: string } | null => {
  const runId = input.agentRunId?.trim() ?? "";
  if (runId.length === 0) {
    return null;
  }
  if (input.status === "running") {
    return { runId, label: "Open live view" };
  }
  return input.status === "failed" || input.status === "timed_out"
    ? { runId, label: "Retry" }
    : null;
};
