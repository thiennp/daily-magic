import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema", () => ({
  ensureProjectBotKnowledgeSchema: async () => undefined,
}));

import { loadBotKnowledgeDailyRows } from "@/lib/knowledge/bots/loadBotKnowledgeDailyRows";
import {
  claimTask,
  createBotKnowledgeDb,
  eventRows,
  logLookup,
  resetBotKnowledgeDb,
} from "@/lib/knowledge/bots/botKnowledgePglite.fixtures";
import { recordBotRelease } from "@/lib/knowledge/bots/recordBotKnowledgeEvents";

const release = (
  taskId: string,
  outcome: "failed" | "done",
  reason: string | null,
) =>
  recordBotRelease({
    projectId: "p1",
    taskId,
    fence: 1,
    outcome,
    verifySignal: null,
    reason,
  });

describe("bot knowledge release and daily rows (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createBotKnowledgeDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetBotKnowledgeDb(state.db as PGlite);
  });

  it("flags a failure whose reason was seen on another task, not a done task", async () => {
    for (const id of ["t1", "t2", "t3"]) await claimTask(id);
    await release("t1", "failed", "Build failed at step 3 (ab12cd34)");
    await release("t2", "failed", "build failed at step 9 (ff00aa11)");
    await release("t3", "done", "all good");
    const byTask = Object.fromEntries(
      (await eventRows(state.db as PGlite)).map((r) => [String(r.task_id), r]),
    );
    expect(byTask.t1?.repeated_mistake).toBe(false);
    expect(byTask.t2?.repeated_mistake).toBe(true);
    expect(byTask.t3).toMatchObject({
      outcome: "done",
      fingerprint: null,
      repeated_mistake: false,
    });
  });

  it("aggregates the with/without split into daily rows", async () => {
    const db = state.db as PGlite;
    await logLookup(db, 3);
    await claimTask("a");
    await claimTask("b");
    await db.exec("DELETE FROM project_skill_lookup_log");
    await claimTask("c");
    await release("a", "failed", "boom");
    await release("b", "failed", "boom");
    const [row] = await loadBotKnowledgeDailyRows("p1", 30);
    expect(row).toMatchObject({
      deviceId: "bot:m1",
      runs: 3,
      runsWith: 2,
      holdoutRuns: 1,
      repeatsWith: 1,
      repeatsHoldout: 0,
    });
  });
});
