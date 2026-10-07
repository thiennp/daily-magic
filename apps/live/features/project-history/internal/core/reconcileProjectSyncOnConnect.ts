/**
 * Versioned reconcile on local connect (History owns — SPEC §3.2).
 * Local wins on key+version; push meta-only via typed pushNeonMeta port.
 * Dispatch wires the allowlisted Neon updater later — this file never writes
 * full bodies/prompts/logs/history to Neon.
 *
 * History OFF keeps tasks/ (purgeProjectHistoryOnOff does not remove them).
 */

import {
  compareVersionProjectTask,
  keyOfProjectTask,
  preferLocalOverNeonNewer,
  toNeonMetaProjectTask,
  type ProjectTaskLocalRecord,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  PROJECT_SYNC_RECONCILE_BATCH_SIZE,
  type ProjectSyncVersion,
} from "@/features/projects/sync/projectSync.types";

export type PushNeonMetaPort = {
  /**
   * Allowlisted meta-only upsert. Implementations MUST reject body fields.
   * Dispatch adds the HTTP route later; S1 stub may no-op / collect.
   */
  readonly pushNeonMeta: (
    batch: readonly ProjectTaskNeonMeta[],
  ) => Promise<
    { readonly ok: true } | { readonly ok: false; readonly reason: string }
  >;
};

export type ReconcileProjectSyncOnConnectInput = {
  readonly projectId: string;
  readonly tableId: string;
  readonly localRecords: readonly ProjectTaskLocalRecord[];
  readonly neonMetaRecords: readonly ProjectTaskNeonMeta[];
  readonly pushNeonMeta: PushNeonMetaPort["pushNeonMeta"];
  /** Optional clock for claim timestamps (tests). */
  readonly nowIso?: string;
  readonly batchSize?: number;
};

export type ReconcileProjectSyncClaim = {
  readonly key: string;
  /** Full local record written/claimed on AWL. */
  readonly local: ProjectTaskLocalRecord;
  /** Meta returned for Neon after claim (version bumped). */
  readonly neonMeta: ProjectTaskNeonMeta;
};

export type ReconcileProjectSyncOnConnectResult = {
  readonly ok: true;
  readonly pushed: readonly ProjectTaskNeonMeta[];
  readonly claimed: readonly ReconcileProjectSyncClaim[];
  readonly keptLocal: readonly ProjectTaskLocalRecord[];
  readonly skippedNeonNewer: readonly string[];
  readonly batches: number;
};

/**
 * Claim a web-created pending Neon meta row: write full local record, bump
 * version, return meta for Neon. Until claim, list may show Neon meta only.
 */
export const claimPendingProjectTaskMeta = (input: {
  readonly neonMeta: ProjectTaskNeonMeta;
  readonly localSeed: ProjectTaskLocalRecord;
  readonly nowIso: string;
}): ReconcileProjectSyncClaim => {
  const bumped: ProjectTaskLocalRecord = {
    ...input.localSeed,
    id: input.neonMeta.id,
    projectId: input.neonMeta.projectId,
    assistantMembershipId:
      input.localSeed.assistantMembershipId ??
      input.neonMeta.assistantMembershipId,
    title: input.localSeed.title || input.neonMeta.title,
    status: input.localSeed.status,
    createdAt: input.neonMeta.createdAt,
    updatedAt: input.nowIso,
    startedAt: input.localSeed.startedAt ?? input.neonMeta.startedAt,
    endedAt: input.localSeed.endedAt ?? input.neonMeta.endedAt,
    version: Math.max(input.localSeed.version, input.neonMeta.version) + 1,
    sessionId: input.localSeed.sessionId ?? input.neonMeta.sessionId,
    agentRunId: input.localSeed.agentRunId ?? input.neonMeta.agentRunId,
    branch: input.localSeed.branch ?? input.neonMeta.branch,
    worktree: input.localSeed.worktree ?? input.neonMeta.worktree,
  };
  const neonMeta = {
    ...toNeonMetaProjectTask(bumped),
    localClaimedAt: input.nowIso,
  };
  return {
    key: keyOfProjectTask(bumped),
    local: bumped,
    neonMeta,
  };
};

const chunk = <T>(items: readonly T[], size: number): T[][] => {
  if (size <= 0) return [items.slice()];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
};

/**
 * Diff local vs Neon meta by key+version; local wins; push meta-only batches.
 * Idempotent: re-running with same inputs yields the same push set.
 */
export const reconcileProjectSyncOnConnect = async (
  input: ReconcileProjectSyncOnConnectInput,
): Promise<ReconcileProjectSyncOnConnectResult> => {
  const nowIso = input.nowIso ?? new Date().toISOString();
  const batchSize = input.batchSize ?? PROJECT_SYNC_RECONCILE_BATCH_SIZE;

  const localByKey = new Map<string, ProjectTaskLocalRecord>();
  for (const record of input.localRecords) {
    if (record.projectId !== input.projectId) continue;
    const key = keyOfProjectTask(record);
    const prev = localByKey.get(key);
    if (prev === undefined || compareVersionProjectTask(record, prev) >= 0) {
      localByKey.set(key, record);
    }
  }

  const neonByKey = new Map<string, ProjectTaskNeonMeta>();
  for (const meta of input.neonMetaRecords) {
    if (meta.projectId !== input.projectId) continue;
    const key = keyOfProjectTask(meta);
    const prev = neonByKey.get(key);
    if (prev === undefined || compareVersionProjectTask(meta, prev) >= 0) {
      neonByKey.set(key, meta);
    }
  }

  const toPush: ProjectTaskNeonMeta[] = [];
  const claimed: ReconcileProjectSyncClaim[] = [];
  const keptLocal: ProjectTaskLocalRecord[] = [];
  const skippedNeonNewer: string[] = [];

  for (const [key, local] of localByKey) {
    const neon = neonByKey.get(key);
    if (neon === undefined) {
      keptLocal.push(local);
      toPush.push(toNeonMetaProjectTask(local));
      continue;
    }
    if (compareVersionProjectTask(local, neon) >= 0) {
      keptLocal.push(local);
      toPush.push(toNeonMetaProjectTask(local));
    } else {
      skippedNeonNewer.push(key);
      // T4: local body/title/prompt win (dirty or clean); Neon refreshes meta only.
      const prefer = preferLocalOverNeonNewer(local, neon);
      keptLocal.push(prefer.winner);
    }
  }

  for (const [key, neon] of neonByKey) {
    if (localByKey.has(key)) continue;
    if (neon.localClaimedAt === null) {
      const seed: ProjectTaskLocalRecord = {
        id: neon.id,
        projectId: neon.projectId,
        assistantMembershipId: neon.assistantMembershipId,
        title: neon.title,
        status: neon.status,
        createdAt: neon.createdAt,
        updatedAt: nowIso,
        startedAt: neon.startedAt,
        endedAt: neon.endedAt,
        version: neon.version,
        sessionId: neon.sessionId,
        agentRunId: neon.agentRunId,
        branch: neon.branch,
        worktree: neon.worktree,
        prompt: "",
        body: "",
        report: null,
        logs: null,
      };
      const claim = claimPendingProjectTaskMeta({
        neonMeta: neon,
        localSeed: seed,
        nowIso,
      });
      claimed.push(claim);
      keptLocal.push(claim.local);
      toPush.push(claim.neonMeta);
    }
  }

  toPush.sort((a, b) => {
    const cmp = compareVersionProjectTask(a, b);
    if (cmp !== 0) return -cmp;
    return keyOfProjectTask(a) < keyOfProjectTask(b) ? -1 : 1;
  });

  const batches = chunk(toPush, batchSize);
  for (const batch of batches) {
    const result = await input.pushNeonMeta(batch);
    if (!result.ok) {
      break;
    }
  }

  return {
    ok: true,
    pushed: toPush,
    claimed,
    keptLocal,
    skippedNeonNewer,
    batches: batches.length,
  };
};

/** No-op allowlisted port for tests / until Dispatch wires the route. */
export const stubPushNeonMetaPort = (): PushNeonMetaPort => ({
  pushNeonMeta: async (batch) => {
    for (const row of batch) {
      const keys = Object.keys(row);
      for (const key of keys) {
        if (
          key === "prompt" ||
          key === "body" ||
          key === "report" ||
          key === "logs" ||
          key === "result_output"
        ) {
          return { ok: false, reason: `body_field_forbidden:${key}` };
        }
      }
    }
    return { ok: true };
  },
});

export type { ProjectSyncVersion };
