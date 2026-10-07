import { mapProjectTaskStatusToUi } from "@/features/projects/sync/adapters/projectTasksAdapter";
import { PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS } from "@/features/projects/sync/projectSync.types";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const thinTitle = (raw: string): string =>
  raw.trim().replace(/\s+/g, " ").slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);

const firstLine = (value: string | null | undefined): string =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0) ?? "";

/**
 * Map Neon agent_runs (Reports feed) → Tasks list meta via S1 status mapper.
 * Branch/worktree not on agent_runs yet → null (hide tags until f61 wires them).
 */
export const mapAgentRunToProjectTaskMeta = (
  run: EnrichedAgentRunRecord,
  projectId: string,
): ProjectTaskMeta => {
  const title =
    thinTitle(firstLine(run.reportSummary) || firstLine(run.prompt)) ||
    "Task";
  const assistantName =
    run.writerAgent?.trim() ||
    run.executorName?.trim() ||
    (run.executorEmail.includes("@") ? run.executorEmail : null);
  return {
    id: run.id,
    projectId,
    assistantMembershipId: null,
    title,
    status: mapProjectTaskStatusToUi(run.status),
    createdAt: run.createdAt,
    updatedAt: run.updatedAt,
    startedAt: run.startedAt,
    endedAt: run.completedAt,
    version: 1,
    sessionId: run.id,
    agentRunId: run.id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
    assistantName,
  };
};
