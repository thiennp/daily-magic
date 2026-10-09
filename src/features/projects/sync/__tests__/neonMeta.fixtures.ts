import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";

/** Task meta row builder shared by the §11.1 happy-path tests. */
export const meta = (partial: {
  id: string;
  createdAt: string;
  updatedAt?: string;
  version?: number;
  title?: string;
  status?: string;
}) =>
  pickProjectTaskNeonMetaAllowlist({
    id: partial.id,
    projectId: "proj-1",
    assistantMembershipId: null,
    title: partial.title ?? "Task",
    status: partial.status ?? "queued",
    createdAt: partial.createdAt,
    updatedAt: partial.updatedAt ?? partial.createdAt,
    startedAt: null,
    endedAt: null,
    version: partial.version ?? 1,
    sessionId: partial.id,
    agentRunId: partial.id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
  });
