/**
 * AWL-local copy of the pure Tasks sync pieces reconcileProjectSyncOnConnect
 * needs (deployable boundary: apps/live may not import AWC `@/features/*`).
 * Source of truth: src/features/projects/sync/adapters/projectTasksAdapter.ts
 * + src/features/projects/sync/projectSync.types.ts — keep byte-for-byte
 * behaviour; test/projectTaskSyncAdapterParity.test.ts guards drift.
 */

/** Tasks UI chip statuses (SPEC §6). */
export type ProjectTaskUiStatus =
  | "queued"
  | "running"
  | "done"
  | "failed"
  | "cancelled";

export type ProjectSyncVersion = {
  readonly version: number;
  readonly updatedAt: string;
};

/** Thin title/summary cap for Neon meta (SPEC §6.1 Soft pick ≤200). */
export const PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS = 200;

/** Reconcile push batch size (SPEC §3.2). */
export const PROJECT_SYNC_RECONCILE_BATCH_SIZE = 50;

/** Local authoritative task / AI-session record (AWL tasks/ + sync fields). */
export type ProjectTaskLocalRecord = {
  readonly id: string;
  readonly projectId: string;
  readonly assistantMembershipId: string | null;
  readonly title: string;
  readonly status: ProjectTaskUiStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly version: number;
  readonly sessionId: string | null;
  readonly agentRunId: string | null;
  readonly branch: string | null;
  readonly worktree: string | null;
  /** Local-only — never to Neon. */
  readonly prompt: string;
  readonly body: string;
  readonly report: string | null;
  readonly logs: string | null;
};

/** Neon meta allowlist (SPEC §6.1). No body/prompt/report/logs. */
export type ProjectTaskNeonMeta = {
  readonly id: string;
  readonly projectId: string;
  readonly assistantMembershipId: string | null;
  readonly title: string;
  readonly status: ProjectTaskUiStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly version: number;
  readonly sessionId: string | null;
  readonly agentRunId: string | null;
  readonly branch: string | null;
  readonly worktree: string | null;
  /** Null until local claims a web-created pending row. */
  readonly localClaimedAt: string | null;
};

type ProjectTaskSyncRecord = ProjectTaskLocalRecord | ProjectTaskNeonMeta;

const thinTitle = (raw: string): string =>
  raw.trim().replace(/\s+/g, " ").slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);

export const keyOfProjectTask = (record: ProjectTaskSyncRecord): string =>
  record.id;

/**
 * Local wins if version >, else if == then updatedAt >, else key string >.
 * Returns >0 when `a` should win over `b`.
 */
export const compareVersionProjectTask = (
  a: ProjectTaskSyncRecord,
  b: ProjectTaskSyncRecord,
): number => {
  if (a.version !== b.version) {
    return a.version > b.version ? 1 : -1;
  }
  if (a.updatedAt !== b.updatedAt) {
    return a.updatedAt > b.updatedAt ? 1 : -1;
  }
  const aKey = keyOfProjectTask(a);
  const bKey = keyOfProjectTask(b);
  if (aKey === bKey) return 0;
  return aKey > bKey ? 1 : -1;
};

/** Pure — meta allowlist only; strips local-only / body fields. */
export const toNeonMetaProjectTask = (
  local: ProjectTaskLocalRecord,
): ProjectTaskNeonMeta => ({
  id: local.id,
  projectId: local.projectId,
  assistantMembershipId: local.assistantMembershipId,
  title: thinTitle(local.title),
  status: local.status,
  createdAt: local.createdAt,
  updatedAt: local.updatedAt,
  startedAt: local.startedAt,
  endedAt: local.endedAt,
  version: local.version,
  sessionId: local.sessionId,
  agentRunId: local.agentRunId,
  branch: local.branch,
  worktree: local.worktree,
  localClaimedAt: local.updatedAt,
});

/**
 * Local SoT body/title/prompt always wins — dirty or clean. Neon-newer may
 * refresh meta fields only (status/times/branch/worktree/session ids/version).
 */
export const preferLocalOverNeonNewer = (
  local: ProjectTaskLocalRecord,
  neon: ProjectTaskNeonMeta,
): {
  readonly winner: ProjectTaskLocalRecord;
  readonly neonNewerSkipped: boolean;
  readonly metaRefreshedFromNeon: boolean;
} => {
  const neonNewer = compareVersionProjectTask(neon, local) > 0;
  if (!neonNewer) {
    return {
      winner: local,
      neonNewerSkipped: false,
      metaRefreshedFromNeon: false,
    };
  }
  const winner: ProjectTaskLocalRecord = {
    id: local.id,
    projectId: local.projectId,
    assistantMembershipId:
      neon.assistantMembershipId ?? local.assistantMembershipId,
    title: local.title,
    status: neon.status,
    createdAt: local.createdAt,
    updatedAt: neon.updatedAt,
    startedAt: neon.startedAt,
    endedAt: neon.endedAt,
    version: neon.version,
    sessionId: neon.sessionId ?? local.sessionId,
    agentRunId: neon.agentRunId ?? local.agentRunId,
    branch: neon.branch ?? local.branch,
    worktree: neon.worktree ?? local.worktree,
    prompt: local.prompt,
    body: local.body,
    report: local.report,
    logs: local.logs,
  };
  return {
    winner,
    neonNewerSkipped: true,
    metaRefreshedFromNeon: true,
  };
};
