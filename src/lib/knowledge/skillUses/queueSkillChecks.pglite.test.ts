import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/knowledge/skillUses/notifySkillCheckDue", () => ({
  notifySkillCheckDue: async () => undefined,
}));
vi.mock("@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema", () => ({
  ensureProjectBotKnowledgeSchema: async () => undefined,
}));
vi.mock(
  "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema",
  () => ({
    ensureProjectSkillComparisonsSchema: async () => undefined,
  }),
);
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillUsesSchema", () => ({
  ensureProjectSkillUsesSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema", () => ({
  ensureProjectSkillChecksSchema: async () => undefined,
}));

import {
  claimTask,
  createBotKnowledgeDb,
  resetBotKnowledgeDb,
} from "@/lib/knowledge/bots/botKnowledgePglite.fixtures";
import {
  logSkillGet,
  publishSkill,
  skillCheckRows,
  skillUseRows,
} from "@/lib/knowledge/skillUses/skillUsesPglite.fixtures";
import { recordBotRelease } from "@/lib/knowledge/bots/recordBotKnowledgeEvents";

const finishRun = async (
  taskId: string,
  outcome: "done" | "failed",
): Promise<void> => {
  await claimTask(taskId, "deploy");
  await recordBotRelease({
    projectId: "p1",
    taskId,
    fence: 1,
    outcome,
    verifySignal: null,
    reason: outcome === "failed" ? "step two broke" : null,
  });
};

describe("queued skill checks (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createBotKnowledgeDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetBotKnowledgeDb(state.db as PGlite);
    await publishSkill(state.db as PGlite, "deploy", 1);
  });

  it("queues a check at the 2nd, 3rd and 5th finished use only", async () => {
    for (const id of ["a", "b", "c", "d", "e", "f"]) {
      await finishRun(id, "done");
    }
    const rows = await skillCheckRows(state.db as PGlite);
    expect(rows.map((r) => r.uses_at_check)).toEqual([2, 3, 5]);
    expect(rows.every((r) => r.trigger === "checkpoint")).toBe(true);
    expect(rows.every((r) => r.status === "due")).toBe(true);
  });

  it("queues an early check after a failed run, once per unjudged failure", async () => {
    await finishRun("a", "failed");
    expect(await skillCheckRows(state.db as PGlite)).toEqual([
      expect.objectContaining({ uses_at_check: 1, trigger: "failure" }),
    ]);
    await finishRun("b", "done");
    const rows = await skillCheckRows(state.db as PGlite);
    expect(rows.map((r) => [r.uses_at_check, r.trigger])).toEqual([
      [1, "failure"],
      [2, "checkpoint"],
    ]);
  });

  it("does not queue anything for runs that used no skill", async () => {
    await claimTask("x");
    await recordBotRelease({
      projectId: "p1",
      taskId: "x",
      fence: 1,
      outcome: "done",
      verifySignal: null,
      reason: null,
    });
    expect(await skillCheckRows(state.db as PGlite)).toEqual([]);
  });
});
