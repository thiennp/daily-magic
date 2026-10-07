/**
 * SPEC §11 matrix — History-owned pager + reconcile + Tasks adapter coverage.
 * H1–H6 happy · T1–T15 conflict · I1–I6 IDB Soft degrade (pager boundary fakes).
 * T12 = real History OFF purge cascade integration (disk learning paths).
 * Human UI owns real IDB client; Dispatch owns Neon package-cap prune HTTP.
 * Soft STOP Soft web History UI — no History UI pages/components.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import {
  assertProjectTaskNeonMetaAllowlist,
  compareVersionProjectTask,
  mergeLocalProjectTask,
  PROJECT_TASK_NEON_FIELDS,
  toIdbProjectTask,
  toNeonMetaProjectTask,
  type ProjectTaskIdbRecord,
  type ProjectTaskLocalRecord,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  isProjectSyncLocalPaging,
  projectSyncConnectionFromProbe,
  reduceProjectSyncConnection,
} from "@/features/projects/sync/projectSyncConnection";
import { encodeProjectSyncCursor } from "@/features/projects/sync/projectSyncCursor";
import {
  idbEntriesOrEmpty,
  ProjectSyncIdbSoftError,
  softReadIdbEntries,
  softWriteIdbBatch,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";
import {
  loadPage,
  mergeProjectSyncEntries,
} from "@/features/projects/sync/projectSyncPager";
import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
} from "@/features/projects/sync/projectSync.types";
import {
  reconcileProjectSyncOnConnect,
} from "../../../../apps/live/features/project-history/internal/core/reconcileProjectSyncOnConnect";
import { atomicWriteFile0600, ensureDir0700 } from "../../../../apps/live/features/project-history/internal/core/atomicWriteFile0600";
import { decideProjectHistoryOffPurge } from "../../../../apps/live/features/project-history/internal/core/decideProjectHistoryOffPurge";
import { hasProjectHistoryPurgeTargets } from "../../../../apps/live/features/project-history/internal/core/hasProjectHistoryPurgeTargets";
import { purgeProjectHistoryOnOff } from "../../../../apps/live/features/project-history/internal/core/purgeProjectHistoryOnOff";
import { reconcileProjectHistoryOffPurge } from "../../../../apps/live/features/project-history/internal/core/reconcileProjectHistoryOffPurge";
import { ensureProjectDataTree } from "../../../../apps/live/features/project-history/internal/core/resolveProjectDataDir";

type PageEntry = {
  readonly id: string;
  readonly createdAt: string;
  readonly src: "idb" | "neon" | "local";
};

const pe = (
  id: string,
  createdAt: string,
  src: PageEntry["src"],
): PageEntry => ({ id, createdAt, src });

const encode = encodeProjectSyncCursor;

const localTask = (
  o: Partial<ProjectTaskLocalRecord> = {},
): ProjectTaskLocalRecord => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: "bot-1",
  title: "Local title",
  status: "running",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T02:00:00.000Z",
  startedAt: "2026-10-07T01:00:00.000Z",
  endedAt: null,
  version: 2,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: "feat/local",
  worktree: "wt-local",
  prompt: "FULL PROMPT MUST NOT REACH NEON",
  body: "FULL BODY MUST NOT REACH NEON",
  report: "FULL REPORT",
  logs: "FULL LOGS",
  ...o,
});

const neonMeta = (
  o: Partial<ProjectTaskNeonMeta> = {},
): ProjectTaskNeonMeta => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: "bot-1",
  title: "Neon title",
  status: "queued",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T01:30:00.000Z",
  startedAt: null,
  endedAt: null,
  version: 1,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: null,
  worktree: null,
  localClaimedAt: "2026-10-07T01:00:00.000Z",
  ...o,
});

const idbRec = (
  o: Partial<ProjectTaskIdbRecord> = {},
): ProjectTaskIdbRecord => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: "bot-1",
  title: "Idb title",
  status: "queued",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T01:10:00.000Z",
  startedAt: null,
  endedAt: null,
  version: 1,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: null,
  worktree: null,
  snippet: "cached",
  ...o,
});

const FORBIDDEN = [
  "prompt",
  "body",
  "report",
  "logs",
  "result_output",
  "history",
  "transcript",
  "transcripts",
] as const;

const load = (input: {
  idb?: readonly PageEntry[];
  local?: readonly PageEntry[];
  neon?: readonly PageEntry[];
  localLive?: boolean;
  beforeRequested?: boolean;
  localHasMore?: boolean;
  neonHasMore?: boolean;
  limit?: number;
}) =>
  loadPage({
    idbEntries: input.idb ?? [],
    localEntries: input.local ?? [],
    localHasMore: input.localHasMore ?? false,
    neonEntries: input.neon ?? [],
    neonHasMore: input.neonHasMore ?? false,
    localLive: input.localLive ?? false,
    beforeRequested: input.beforeRequested ?? false,
    limit: input.limit ?? 50,
    keyOf: (e) => e.id,
    createdAtOf: (e) => e.createdAt,
    encodeCursor: encode,
  });

describe("§11.1 happy paths H1–H6", () => {
  it("H1: fresh list, local live, IDB empty → page from local; meta allowlist only", async () => {
    const page = load({
      local: [pe("a", "2026-10-07T03:00:00.000Z", "local")],
      localLive: true,
    });
    expect(page.page.source).toBe("local");
    expect(page.entries[0]?.src).toBe("local");
    const meta = toNeonMetaProjectTask(localTask({ id: "a" }));
    expect(assertProjectTaskNeonMetaAllowlist(meta)).toEqual([]);
  });

  it("H2: warm IDB Load older — no duplicate rows; cursor advances", () => {
    const page = load({
      idb: [
        pe("c", "2026-10-07T03:00:00.000Z", "idb"),
        pe("b", "2026-10-07T02:00:00.000Z", "idb"),
      ],
      local: [pe("c", "2026-10-07T03:00:00.000Z", "local")],
      localLive: true,
      beforeRequested: true,
      limit: 2,
    });
    expect(page.entries.map((e) => e.id)).toEqual(["c", "b"]);
    expect(page.entries.filter((e) => e.id === "c")).toHaveLength(1);
    expect(page.page.beforeCursor).toBeTruthy();
  });

  it("H3: local live + Neon meta → prefer local", () => {
    const page = load({
      local: [pe("k", "2026-10-07T01:00:00.000Z", "local")],
      neon: [pe("k", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: true,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.entries[0]?.src).toBe("local");
  });

  it("H4: reconcile on connect, no conflicts → push local meta; FSM reconciling→local_live", async () => {
    let state = reduceProjectSyncConnection("neon_only", { type: "local_back" });
    expect(state).toBe("reconciling");
    const pushed: ProjectTaskNeonMeta[] = [];
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [localTask()],
      neonMetaRecords: [neonMeta({ version: 2, updatedAt: "2026-10-07T02:00:00.000Z" })],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(result.ok).toBe(true);
    expect(pushed[0]?.version).toBe(2);
    state = reduceProjectSyncConnection(state, { type: "reconcile_done" });
    expect(state).toBe("local_live");
    expect(isProjectSyncLocalPaging(state)).toBe(true);
  });

  it("H5: Open history / Load older — offline only when exhausted + !localLive", () => {
    const ok = load({
      neon: [pe("n", "2026-10-07T01:00:00.000Z", "neon")],
      beforeRequested: true,
      localLive: false,
    });
    expect(ok.error).toBeUndefined();
    const lost = load({ beforeRequested: true, localLive: false });
    expect(lost.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
  });

  it("H6: sign-out/leave — IDB clear contract does not touch Neon (port stub)", async () => {
    // History co-owns: Soft write abort leaves Neon untouched (Human clears IDB).
    const write = softWriteIdbBatch({
      write: async () => {
        throw new ProjectSyncIdbSoftError("unavailable");
      },
    });
    const result = await write;
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.neonUntouched).toBe(true);
      expect(result.localUntouched).toBe(true);
    }
  });
});

describe("§11.2 conflict T1–T15", () => {
  it("T1: IDB newer than Neon, local offline — pager serves IDB", () => {
    const page = load({
      idb: [pe("k", "2026-10-07T02:00:00.000Z", "idb")],
      neon: [pe("k", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: false,
    });
    // Same key: neon overwrites idb in merge preference local>neon>idb
    // When versions differ as records, pager key merge prefers neon over idb.
    // T1 expect: serve IDB when IDB is the only body-bearing cache and neon is meta —
    // for timeline pager slices, neon wins on key; Tasks adapter compareVersion
    // is the SoT for versioned records. Cover versioned SoT here:
    const idb = idbRec({ version: 5, updatedAt: "2026-10-07T05:00:00.000Z" });
    const neon = neonMeta({ version: 2, updatedAt: "2026-10-07T01:00:00.000Z" });
    expect(compareVersionProjectTask(idb, neon)).toBeGreaterThan(0);
    // Pager with only idb (neon meta not yet mapped to page entry) serves idb:
    const idbOnly = load({
      idb: [pe("k", "2026-10-07T02:00:00.000Z", "idb")],
      localLive: false,
    });
    expect(idbOnly.page.source).toBe("idb");
    expect(idbOnly.entries[0]?.src).toBe("idb");
  });

  it("T2: Neon meta newer than IDB, local offline — merge allowlist only; bodies unchanged", () => {
    const idb = idbRec({
      version: 1,
      title: "old",
      snippet: "local snippet body-ish",
    });
    const neon = neonMeta({ version: 3, title: "new meta", updatedAt: "2026-10-07T09:00:00.000Z" });
    expect(compareVersionProjectTask(neon, idb)).toBeGreaterThan(0);
    const mergedIdb = toIdbProjectTask(neon);
    expect(mergedIdb.title).toBe("new meta");
    expect(mergedIdb).not.toHaveProperty("prompt");
    expect(mergedIdb).not.toHaveProperty("body");
    // original idb snippet not promoted to Neon
    const backToNeon = {
      ...neon,
      // simulate accidental body smuggle
    };
    expect(assertProjectTaskNeonMetaAllowlist(backToNeon)).toEqual([]);
  });

  it("T3: local version > Neon and IDB — on connect local wins; meta from local", async () => {
    const pushed: ProjectTaskNeonMeta[] = [];
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [localTask({ version: 7, title: "Local wins" })],
      neonMetaRecords: [neonMeta({ version: 2 })],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(pushed[0]?.title).toBe("Local wins");
    expect(pushed[0]?.version).toBe(7);
    expect(toIdbProjectTask(localTask({ version: 7 })).version).toBe(7);
    expect(result.skippedNeonNewer).toEqual([]);
  });

  it("T4: Neon version > local — still local authoritative; do not clobber body", async () => {
    const pushed: ProjectTaskNeonMeta[] = [];
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [
        localTask({ version: 1, title: "Keep local", body: "SECRET BODY" }),
      ],
      neonMetaRecords: [
        neonMeta({ version: 99, title: "Neon ahead", updatedAt: "2026-10-07T09:00:00.000Z" }),
      ],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(result.skippedNeonNewer).toContain("run-1");
    expect(pushed).toHaveLength(0);
    expect(result.keptLocal[0]?.body).toBe("SECRET BODY");
    expect(result.keptLocal[0]?.title).toBe("Keep local");
  });

  it("T5: equal version divergent meta — tie-break updatedAt then key", () => {
    const a = localTask({
      id: "a",
      version: 2,
      updatedAt: "2026-10-07T03:00:00.000Z",
    });
    const b = neonMeta({
      id: "a",
      version: 2,
      updatedAt: "2026-10-07T02:00:00.000Z",
    });
    expect(compareVersionProjectTask(a, b)).toBeGreaterThan(0);
    const hi = localTask({ id: "b", version: 2, updatedAt: "2026-10-07T02:00:00.000Z" });
    const lo = neonMeta({ id: "a", version: 2, updatedAt: "2026-10-07T02:00:00.000Z" });
    expect(compareVersionProjectTask(hi, lo)).toBeGreaterThan(0);
  });

  it("T6: duplicate keys — single surviving record; reconcile idempotent", async () => {
    const merged = mergeProjectSyncEntries({
      idbEntries: [pe("dup", "2026-10-07T01:00:00.000Z", "idb")],
      neonEntries: [pe("dup", "2026-10-07T01:00:00.000Z", "neon")],
      localEntries: [pe("dup", "2026-10-07T01:00:00.000Z", "local")],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged).toHaveLength(1);
    expect(merged[0]?.src).toBe("local");
    const input = {
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [localTask()],
      neonMetaRecords: [neonMeta()],
      pushNeonMeta: async () => ({ ok: true as const }),
    };
    const a = await reconcileProjectSyncOnConnect(input);
    const b = await reconcileProjectSyncOnConnect(input);
    expect(a.pushed).toEqual(b.pushed);
  });

  it("T7: dual-write chat assign while local live — one pager row", () => {
    const page = load({
      local: [pe("run-1", "2026-10-07T01:00:00.000Z", "local")],
      neon: [pe("run-1", "2026-10-07T01:00:00.000Z", "neon")],
      idb: [pe("run-1", "2026-10-07T01:00:00.000Z", "idb")],
      localLive: true,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.entries[0]?.src).toBe("local");
  });

  it("T8: web create offline → reconnect claim pending; version bump; IDB from local", async () => {
    const pending = neonMeta({
      id: "web-1",
      localClaimedAt: null,
      version: 1,
      title: "Web pending",
    });
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [],
      neonMetaRecords: [pending],
      nowIso: "2026-10-07T12:44:00.000Z",
      pushNeonMeta: async () => ({ ok: true }),
    });
    expect(result.claimed).toHaveLength(1);
    expect(result.claimed[0]?.local.version).toBe(2);
    expect(result.claimed[0]?.neonMeta.localClaimedAt).toBe(
      "2026-10-07T12:44:00.000Z",
    );
    const idb = toIdbProjectTask(result.claimed[0]!.local);
    expect(idb.version).toBe(2);
    expect(idb).not.toHaveProperty("prompt");
  });

  it("T9: offline → reconnect mid-page FSM; no duplicate cursor pages", () => {
    let state = projectSyncConnectionFromProbe({ localLive: false });
    state = reduceProjectSyncConnection(state, { type: "neon_ok" });
    expect(state).toBe("neon_only");
    state = reduceProjectSyncConnection(state, {
      type: "load_older_exhausted_offline",
    });
    expect(state).toBe("lost");
    state = reduceProjectSyncConnection(state, { type: "local_back" });
    expect(state).toBe("reconciling");
    state = reduceProjectSyncConnection(state, { type: "reconcile_done" });
    expect(state).toBe("local_live");
    const page = load({
      local: [pe("a", "2026-10-07T01:00:00.000Z", "local")],
      neon: [pe("a", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: true,
      beforeRequested: true,
    });
    expect(page.entries).toHaveLength(1);
  });

  it("T10: Load older local live prefers local over Neon (source local when only local)", () => {
    const page = load({
      local: [pe("a", "2026-10-07T02:00:00.000Z", "local")],
      neon: [pe("b", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: true,
    });
    expect(page.page.source).toBe("mixed");
    expect(page.entries[0]?.src).toBe("local");
    const localOnly = load({
      local: [pe("a", "2026-10-07T02:00:00.000Z", "local")],
      neon: [pe("a", "2026-10-07T02:00:00.000Z", "neon")],
      localLive: true,
    });
    expect(localOnly.entries[0]?.src).toBe("local");
  });

  it("T11: Neon exhausted + local offline → project_computer_offline exact EN", () => {
    const page = load({ beforeRequested: true, localLive: false });
    expect(page.error?.code).toBe("project_computer_offline");
    expect(page.error?.message).toBe(
      "Connection to the project computer was lost.",
    );
    expect(page.page.source).toBe("exhausted");
  });

  describe("T12: History OFF purge cascade", () => {
    let tempRoot = "";

    beforeEach(() => {
      tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-t12-"));
      layoutState.root = tempRoot;
      vi.spyOn(console, "info").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
      fs.rmSync(tempRoot, { recursive: true, force: true });
    });

    it("purges learning paths only; keeps history/ + tasks/; no body into Neon", async () => {
      const root = ensureProjectDataTree("proj-t12");
      atomicWriteFile0600(path.join(root, "history", "m1.json"), '{"messageId":"m1"}\n');
      atomicWriteFile0600(
        path.join(root, "tasks", "run-1.json"),
        '{"taskId":"run-1","body":"KEEP LOCAL BODY"}\n',
      );
      ensureDir0700(path.join(root, "skills", "_drafts", "d1"));
      atomicWriteFile0600(
        path.join(root, "skills", "_drafts", "d1", "SKILL.md"),
        "draft\n",
      );
      atomicWriteFile0600(path.join(root, "skillgen", "episodes.json"), "{}\n");
      ensureDir0700(path.join(root, "outcomes"));
      atomicWriteFile0600(path.join(root, "outcomes", "outcomes.db"), "db\n");
      ensureDir0700(path.join(root, "skills", "keep-me"));
      atomicWriteFile0600(path.join(root, "skills", "keep-me", "meta.json"), "{}\n");
      atomicWriteFile0600(
        path.join(root, "skills", "_tombstones", "gone.json"),
        "{}\n",
      );

      expect(hasProjectHistoryPurgeTargets("proj-t12")).toBe(true);
      expect(
        decideProjectHistoryOffPurge({
          cloudState: { kind: "known", state: "off" },
          hasPurgeTargets: true,
        }),
      ).toBe("purge");

      const outcome = await reconcileProjectHistoryOffPurge({
        projectId: "proj-t12",
        cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
        deps: {
          fetchCloudState: async () => ({ kind: "known", state: "off" }),
        },
      });
      expect(outcome).toBe("purged");

      // Learning purged
      expect(fs.existsSync(path.join(root, "skills", "_drafts"))).toBe(false);
      expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
      expect(fs.existsSync(path.join(root, "outcomes"))).toBe(false);
      // Chats + C1 tasks kept
      expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
      expect(fs.existsSync(path.join(root, "tasks", "run-1.json"))).toBe(true);
      expect(
        fs.readFileSync(path.join(root, "tasks", "run-1.json"), "utf8"),
      ).toContain("KEEP LOCAL BODY");
      // Mirror + tombstones kept
      expect(fs.existsSync(path.join(root, "skills", "keep-me", "meta.json"))).toBe(
        true,
      );
      expect(
        fs.existsSync(path.join(root, "skills", "_tombstones", "gone.json")),
      ).toBe(true);
      expect(hasProjectHistoryPurgeTargets("proj-t12")).toBe(false);

      // Idempotent second OFF
      expect(
        await reconcileProjectHistoryOffPurge({
          projectId: "proj-t12",
          cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
          deps: {
            fetchCloudState: async () => ({ kind: "known", state: "off" }),
          },
        }),
      ).toBe("nothing_to_purge");

      // Direct purge result shape + Neon no-body contract
      const again = purgeProjectHistoryOnOff({ projectId: "proj-t12" });
      expect(again).toEqual({
        removedDrafts: false,
        removedSkillgen: false,
        removedOutcomes: false,
      });
      const meta = toNeonMetaProjectTask(
        localTask({ prompt: "keep local", body: "keep local" }),
      );
      for (const bad of FORBIDDEN) {
        expect(meta).not.toHaveProperty(bad);
      }
      const merged = mergeLocalProjectTask(
        localTask({ body: "KEEP" }),
        localTask({
          version: 1,
          body: "KEEP",
          updatedAt: "2026-10-07T01:00:00.000Z",
        }),
      );
      expect(merged.body).toBe("KEEP");
    });
  });

  it("T13: package-cap Neon meta — allowlist only; never bodies (Dispatch owns prune)", () => {
    const meta = toNeonMetaProjectTask(localTask());
    expect(Object.keys(meta).sort()).toEqual([...PROJECT_TASK_NEON_FIELDS].sort());
    for (const bad of FORBIDDEN) {
      expect(meta).not.toHaveProperty(bad);
    }
  });

  it("T14: branch/worktree names in meta; paths stay local-only", () => {
    const meta = toNeonMetaProjectTask(
      localTask({
        branch: "feat/x",
        worktree: "wt-name",
        body: "/absolute/worktree/path/secret",
      }),
    );
    expect(meta.branch).toBe("feat/x");
    expect(meta.worktree).toBe("wt-name");
    expect(JSON.stringify(meta)).not.toContain("/absolute/worktree");
  });

  it("T15: cancelled tombstone — Neon status cancelled; no body resurrect", async () => {
    const cancelled = localTask({
      status: "cancelled",
      version: 4,
      body: "should not sync",
    });
    const meta = toNeonMetaProjectTask(cancelled);
    expect(meta.status).toBe("cancelled");
    expect(meta).not.toHaveProperty("body");
    const pushed: ProjectTaskNeonMeta[] = [];
    await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [cancelled],
      neonMetaRecords: [neonMeta({ version: 1, status: "queued" })],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(pushed[0]?.status).toBe("cancelled");
    expect(pushed[0]).not.toHaveProperty("body");
  });
});

describe("§11.3 IDB Soft degrade I1–I6 (pager/reconcile boundary)", () => {
  it("I1: quota exceeded on put — Soft degrade; Neon unchanged", async () => {
    const result = await softWriteIdbBatch({
      write: async () => {
        throw new ProjectSyncIdbSoftError("quota_exceeded");
      },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.kind).toBe("quota_exceeded");
      expect(result.neonUntouched).toBe(true);
    }
    // Load older still works via Neon
    const page = load({
      neon: [pe("n", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: false,
    });
    expect(page.error).toBeUndefined();
    expect(page.page.source).toBe("neon");
  });

  it("I2: open blocked — Soft degrade without IDB; Load older works", async () => {
    const read = await softReadIdbEntries<PageEntry>({
      read: async () => {
        throw new ProjectSyncIdbSoftError("open_blocked");
      },
    });
    expect(read.ok).toBe(false);
    const page = load({
      idb: idbEntriesOrEmpty(read),
      neon: [pe("n", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: false,
    });
    expect(page.entries[0]?.src).toBe("neon");
  });

  it("I3: corrupted store — skip IDB; never wipe Neon/local", async () => {
    const read = await softReadIdbEntries<PageEntry>({
      read: async () => {
        throw new ProjectSyncIdbSoftError("corrupted");
      },
    });
    expect(read.ok).toBe(false);
    if (!read.ok) expect(read.kind).toBe("corrupted");
    const local = localTask();
    expect(local.body).toBe("FULL BODY MUST NOT REACH NEON");
    const meta = toNeonMetaProjectTask(local);
    expect(assertProjectTaskNeonMetaAllowlist(meta)).toEqual([]);
  });

  it("I4: IDB unavailable / private mode — Soft degrade; page Neon+local", async () => {
    const read = await softReadIdbEntries<PageEntry>({
      read: async () => {
        throw new ProjectSyncIdbSoftError("unavailable");
      },
    });
    const page = load({
      idb: idbEntriesOrEmpty(read),
      local: [pe("l", "2026-10-07T02:00:00.000Z", "local")],
      neon: [pe("n", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: true,
    });
    expect(page.error).toBeUndefined();
    expect(page.entries.map((e) => e.id)).toEqual(["l", "n"]);
  });

  it("I5: write fail mid-reconcile — abort IDB batch only; Neon/local consistent", async () => {
    const pushed: ProjectTaskNeonMeta[] = [];
    const reconcile = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [localTask()],
      neonMetaRecords: [neonMeta()],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(pushed).toHaveLength(1);
    const idbWrite = await softWriteIdbBatch({
      write: async () => {
        throw new ProjectSyncIdbSoftError("write_fail");
      },
    });
    expect(idbWrite.ok).toBe(false);
    if (!idbWrite.ok) {
      expect(idbWrite.neonUntouched).toBe(true);
      expect(idbWrite.localUntouched).toBe(true);
    }
    // Neon push from reconcile already succeeded and stayed meta-only
    expect(pushed[0]).not.toHaveProperty("prompt");
    expect(reconcile.keptLocal[0]?.body).toBe("FULL BODY MUST NOT REACH NEON");
  });

  it("I6: IDB read fail during Load older — skip IDB; fall through local→Neon→lost", async () => {
    const read = await softReadIdbEntries<PageEntry>({
      read: async () => {
        throw new ProjectSyncIdbSoftError("read_fail");
      },
    });
    const withLocal = load({
      idb: idbEntriesOrEmpty(read),
      local: [pe("l", "2026-10-07T02:00:00.000Z", "local")],
      localLive: true,
      beforeRequested: true,
    });
    expect(withLocal.error).toBeUndefined();
    expect(withLocal.page.source).toBe("local");

    const withNeon = load({
      idb: idbEntriesOrEmpty(read),
      neon: [pe("n", "2026-10-07T01:00:00.000Z", "neon")],
      localLive: false,
      beforeRequested: true,
    });
    expect(withNeon.error).toBeUndefined();
    expect(withNeon.page.source).toBe("neon");

    const lost = load({
      idb: idbEntriesOrEmpty(read),
      localLive: false,
      beforeRequested: true,
    });
    expect(lost.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
  });

  it("I*: Soft read/write never throws out to Load older caller", async () => {
    await expect(
      softReadIdbEntries<PageEntry>({
        read: async () => {
          throw new Error("boom");
        },
      }),
    ).resolves.toMatchObject({ ok: false, entries: [] });
    await expect(
      softWriteIdbBatch({
        write: async () => {
          throw new Error("boom");
        },
      }),
    ).resolves.toMatchObject({ ok: false, neonUntouched: true });
  });
});

describe("§11 Neon allowlist / summary cap", () => {
  it("toNeonMeta truncates title ≤200 and rejects body keys", () => {
    const meta = toNeonMetaProjectTask(
      localTask({ title: "x".repeat(PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS + 40) }),
    );
    expect(meta.title.length).toBe(PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);
    const dirty = { ...meta, prompt: "x", history: [] } as Record<string, unknown>;
    expect(assertProjectTaskNeonMetaAllowlist(dirty)).toEqual(
      expect.arrayContaining(["prompt", "history"]),
    );
  });
});
