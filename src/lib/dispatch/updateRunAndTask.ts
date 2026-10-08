import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { pickRunFailureReason } from "@/lib/projects/tasks/mapAgentRunToTaskStatus";
import { syncProjectTaskWithRun } from "@/lib/projects/tasks/projectTaskRunLink";

type RunStatusFields = NonNullable<Parameters<typeof updateAgentRunStatus>[2]>;

/**
 * updateAgentRunStatus, then move the task record linked to this run (planned
 * work board) to match: running, done, blocked (+ reason) or back to To do.
 */
export const updateRunAndTask = async (
  runId: string,
  status: AgentRunStatusValue,
  fields?: RunStatusFields,
): Promise<AgentRunRecord | null> => {
  const run = await updateAgentRunStatus(runId, status, fields);
  if (run !== null) {
    await syncProjectTaskWithRun({
      runId,
      status,
      exitCode: fields?.resultExitCode,
      reason: pickRunFailureReason(fields?.denialReason, fields?.resultOutput),
    });
  }
  return run;
};
