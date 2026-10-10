import { toNeonMetaProjectTask } from "@/features/projects/sync/public-api/presentation";
import type {
  ProjectTaskIdbRecord,
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "@/features/projects/sync/public-api/types";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";

/** Neon / IDB / local task rows → one UI meta shape (assistantName filled later). */
export const toProjectTaskMeta = (
  row: ProjectTaskNeonMeta | ProjectTaskIdbRecord | ProjectTaskLocalRecord,
): ProjectTaskMeta => {
  if ("prompt" in row) {
    return { ...toNeonMetaProjectTask(row), assistantName: null };
  }
  if ("localClaimedAt" in row) {
    return { ...row, assistantName: null };
  }
  return {
    id: row.id,
    projectId: row.projectId,
    assistantMembershipId: row.assistantMembershipId,
    title: row.title,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    startedAt: row.startedAt,
    endedAt: row.endedAt,
    version: row.version,
    sessionId: row.sessionId,
    agentRunId: row.agentRunId,
    branch: row.branch,
    worktree: row.worktree,
    localClaimedAt: null,
    assistantName: null,
  };
};
