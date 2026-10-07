import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  PROJECT_SYNC_IDB_DB_NAME,
  PROJECT_SYNC_IDB_DB_VERSION,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
  PROJECT_SYNC_TABLE_PROJECT_TASKS,
} from "@/features/projects/sync/projectSyncIdb.constant";
import {
  classifyProjectSyncIdbFailure,
  clearProjectSyncAll,
  clearProjectSyncForProject,
  readProjectSyncRow,
  resetProjectSyncIdbHolder,
} from "@/features/projects/sync/projectSyncIdb";

describe("projectSyncIdb (Human — replaces S1 stub)", () => {
  it("keeps legacy awc-chat DB name; version 2 adds projectTasks", () => {
    expect(PROJECT_SYNC_IDB_DB_NAME).toBe("awc-chat");
    expect(PROJECT_SYNC_IDB_DB_VERSION).toBe(2);
    expect(PROJECT_SYNC_TABLE_MESSENGER_CHATS).toBe("messengerChats");
    expect(PROJECT_SYNC_TABLE_PROJECT_TASKS).toBe("projectTasks");
  });

  it("upgrade path creates stores; Soft-degrade kinds align with SoftDegrade", () => {
    const src = readFileSync(
      path.join(process.cwd(), "src/features/projects/sync/projectSyncIdb.ts"),
      "utf8",
    );
    expect(src).toContain("ensureStore");
    expect(src).toContain("PROJECT_SYNC_TABLE_PROJECT_TASKS");
    expect(src).toContain("quota_exceeded");
    expect(src).toContain("open_blocked");
    expect(src).toContain("corrupted");
    expect(src).not.toMatch(/deleteObjectStore/);
    expect(classifyProjectSyncIdbFailure({ name: "QuotaExceededError" })).toBe(
      "quota_exceeded",
    );
  });

  it("SSR: read/clear quiet no-ops", async () => {
    resetProjectSyncIdbHolder();
    expect(await readProjectSyncRow("projectTasks", "p1:t1")).toBeNull();
    expect(await clearProjectSyncForProject("p1")).toBe(false);
    expect(await clearProjectSyncAll()).toBe(false);
  });
});
