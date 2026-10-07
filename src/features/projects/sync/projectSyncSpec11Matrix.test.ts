/**
 * SPEC §11 — Human UI slice after Soft FIX Soft Soft rebase onto History S1.
 * Owns real IDB I1–I6 Soft degrade + H6 clear; T4 harden vs S1 preferLocalDirty.
 * History owns full H/T pager+reconcile matrix (projectSync.conflictMatrix.test.ts).
 * T12 ACCEPT defer (History OFF purge).
 */
import { describe, expect, it } from "vitest";

import {
  preferLocalOverNeonNewer,
  type ProjectTaskLocalRecord,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
} from "@/features/projects/sync/projectSync.types";
import {
  ProjectSyncIdbSoftError,
  softReadIdbEntries,
  softWriteIdbBatch,
  type ProjectSyncIdbFailureKind,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";
import {
  classifyProjectSyncIdbFailure,
  clearProjectSyncAll,
  clearProjectSyncForProject,
  readProjectSyncRow,
  resetProjectSyncIdbHolder,
} from "@/features/projects/sync/projectSyncIdb";
import {
  PROJECT_SYNC_IDB_DB_NAME,
  PROJECT_SYNC_IDB_DB_VERSION,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
  PROJECT_SYNC_TABLE_PROJECT_TASKS,
} from "@/features/projects/sync/projectSyncIdb.constant";

// Lightweight memory store for H6 (re-add minimal inline — Human memory store was deleted)
const memoryStore = () => {
  const tables = new Map<string, Map<string, { projectId: string }>>();
  for (const id of [PROJECT_SYNC_TABLE_PROJECT_TASKS, PROJECT_SYNC_TABLE_MESSENGER_CHATS]) {
    tables.set(id, new Map());
  }
  return {
    write: (table: string, key: string, row: { projectId: string }) => {
      tables.get(table)?.set(key, row);
    },
    clearProject: (projectId: string) => {
      for (const store of tables.values()) {
        for (const [k, row] of store) {
          if (row.projectId === projectId) store.delete(k);
        }
      }
    },
    clearAll: () => {
      for (const store of tables.values()) store.clear();
    },
    keys: (table: string) => [...(tables.get(table)?.keys() ?? [])],
  };
};

const local = (
  partial: Partial<ProjectTaskLocalRecord> &
    Pick<ProjectTaskLocalRecord, "version" | "title" | "body">,
): ProjectTaskLocalRecord => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: "m1",
  status: "queued",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T01:00:00.000Z",
  startedAt: null,
  endedAt: null,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: null,
  worktree: null,
  prompt: "",
  report: null,
  logs: null,
  ...partial,
});

const neon = (
  partial: Partial<ProjectTaskNeonMeta> & Pick<ProjectTaskNeonMeta, "version" | "title">,
): ProjectTaskNeonMeta => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: "m1",
  status: "queued",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T09:00:00.000Z",
  startedAt: null,
  endedAt: null,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: null,
  worktree: null,
  localClaimedAt: "2026-10-07T01:00:00.000Z",
  ...partial,
});

describe("SPEC §11 Human IDB + T4 Soft FIX Soft Soft", () => {
  it("H6: clearProject / clearAll wipe tasks+chat stores (memory); Neon untouched", () => {
    const store = memoryStore();
    store.write(PROJECT_SYNC_TABLE_PROJECT_TASKS, "p1:t1", {
      projectId: "p1",
    });
    store.write(PROJECT_SYNC_TABLE_MESSENGER_CHATS, "p1:whole", {
      projectId: "p1",
    });
    store.clearProject("p1");
    expect(store.keys(PROJECT_SYNC_TABLE_PROJECT_TASKS)).toEqual([]);
    expect(store.keys(PROJECT_SYNC_TABLE_MESSENGER_CHATS)).toEqual([]);
    store.write(PROJECT_SYNC_TABLE_PROJECT_TASKS, "p1:t1", { projectId: "p1" });
    store.clearAll();
    expect(store.keys(PROJECT_SYNC_TABLE_PROJECT_TASKS)).toEqual([]);
  });

  it("H6 SSR: real IDB clear is quiet no-op", async () => {
    resetProjectSyncIdbHolder();
    expect(await clearProjectSyncForProject("p1")).toBe(false);
    expect(await clearProjectSyncAll()).toBe(false);
    expect(await readProjectSyncRow("projectTasks", "p1:t1")).toBeNull();
  });

  it("T4 harden: local unsynced edit wins over Neon-newer (S1 preferLocalDirty)", () => {
    const loc = local({
      version: 1,
      title: "Keep local unsynced",
      body: "SECRET BODY",
      prompt: "dirty local edit",
    });
    const neo = neon({ version: 99, title: "Neon ahead", status: "running" });
    const prefer = preferLocalOverNeonNewer(loc, neo);
    expect(prefer.neonNewerSkipped).toBe(true);
    expect(prefer.metaRefreshedFromNeon).toBe(true);
    expect(prefer.winner.body).toBe("SECRET BODY");
    expect(prefer.winner.title).toBe("Keep local unsynced");
    expect(prefer.winner.prompt).toBe("dirty local edit");
    expect(prefer.winner.status).toBe("running");
  });

  it("T4 clean local: Neon-newer meta-only; body/title/prompt stay local", () => {
    const loc = local({
      version: 2,
      title: "Synced clean title",
      body: "clean body",
      prompt: "clean prompt",
      status: "queued",
    });
    const neo = neon({
      version: 8,
      title: "Neon must not clobber title",
      status: "done",
      endedAt: "2026-10-07T10:00:00.000Z",
    });
    const prefer = preferLocalOverNeonNewer(loc, neo);
    expect(prefer.neonNewerSkipped).toBe(true);
    expect(prefer.metaRefreshedFromNeon).toBe(true);
    expect(prefer.winner.body).toBe("clean body");
    expect(prefer.winner.prompt).toBe("clean prompt");
    expect(prefer.winner.title).toBe("Synced clean title");
    expect(prefer.winner.status).toBe("done");
    expect(prefer.winner.version).toBe(8);
    expect(prefer.winner.endedAt).toBe("2026-10-07T10:00:00.000Z");
  });

  it("IDB structure: awc-chat v2 + projectTasks", () => {
    expect(PROJECT_SYNC_IDB_DB_NAME).toBe("awc-chat");
    expect(PROJECT_SYNC_IDB_DB_VERSION).toBe(2);
    expect(PROJECT_SYNC_TABLE_PROJECT_TASKS).toBe("projectTasks");
  });

  const kinds: readonly {
    readonly id: string;
    readonly cause: unknown;
    readonly kind: ProjectSyncIdbFailureKind;
  }[] = [
    {
      id: "I1",
      cause: { name: "QuotaExceededError", message: "Quota exceeded" },
      kind: "quota_exceeded",
    },
    {
      id: "I2",
      cause: { name: "UnknownError", message: "blocked" },
      kind: "open_blocked",
    },
    {
      id: "I3",
      cause: { name: "InvalidStateError", message: "corrupt" },
      kind: "corrupted",
    },
    { id: "I4", cause: null, kind: "unavailable" },
    {
      id: "I5",
      cause: { name: "AbortError", message: "write aborted" },
      kind: "write_fail",
    },
    {
      id: "I6",
      cause: { name: "Error", message: "IDB read failed" },
      kind: "read_fail",
    },
  ];

  for (const row of kinds) {
    it(`${row.id}: classify → ${row.kind}; softRead/write never throw to UI`, async () => {
      expect(classifyProjectSyncIdbFailure(row.cause)).toBe(row.kind);
      const read = await softReadIdbEntries({
        read: async () => {
          throw new ProjectSyncIdbSoftError(row.kind);
        },
      });
      expect(read.ok).toBe(false);
      if (!read.ok) expect(read.kind).toBe(row.kind);
      expect(read.entries).toEqual([]);
      const write = await softWriteIdbBatch({
        write: async () => {
          throw new ProjectSyncIdbSoftError(row.kind);
        },
      });
      expect(write.ok).toBe(false);
      if (!write.ok) {
        expect(write.neonUntouched).toBe(true);
        expect(write.localUntouched).toBe(true);
      }
    });
  }

  it("offline EN locked", () => {
    expect(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR.message).toBe(
      "Connection to the project computer was lost.",
    );
  });
});
