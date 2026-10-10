import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock(
  "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema",
  () => ({
    ensureProjectSkillComparisonsSchema: async () => undefined,
  }),
);
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema", () => ({
  ensureProjectSkillChecksSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillUsesSchema", () => ({
  ensureProjectSkillUsesSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema", () => ({
  ensureProjectBotKnowledgeSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/skillUses/notifySkillCheckDue", () => ({
  notifySkillCheckDue: async () => undefined,
}));

import {
  claimTask,
  createBotKnowledgeDb,
  resetBotKnowledgeDb,
} from "@/lib/knowledge/bots/botKnowledgePglite.fixtures";
import { recordBotRelease } from "@/lib/knowledge/bots/recordBotKnowledgeEvents";
import { chooseSkillVersionToServe } from "@/lib/knowledge/skillUses/chooseSkillVersionToServe";
import {
  decideSkillComparison,
  listSkillComparisons,
} from "@/lib/knowledge/skillUses/listSkillComparisons";
import { publishSkill } from "@/lib/knowledge/skillUses/skillUsesPglite.fixtures";
import { startSkillComparison } from "@/lib/knowledge/skillUses/startSkillComparison";

const start = (newVersion: number, checkId = 1): Promise<void> =>
  startSkillComparison({
    projectId: "p1",
    skillId: "deploy",
    newVersion,
    checkId,
  });

const serve = (actorUserId: string): Promise<number | null> =>
  chooseSkillVersionToServe({
    projectId: "p1",
    skillId: "deploy",
    actorUserId,
  });

const finish = async (taskId: string, outcome: "done" | "failed") => {
  await claimTask(taskId, "deploy");
  await recordBotRelease({
    projectId: "p1",
    taskId,
    fence: 1,
    outcome,
    verifySignal: null,
    reason: outcome === "failed" ? "broke" : null,
  });
};

describe("running two skill versions side by side (PGlite, real migration SQL)", () => {
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

  it("alternates old and new between actors and keeps one actor on one version", async () => {
    expect(await serve("u0")).toBeNull();
    await start(2, 1);
    await start(3, 2);
    expect(await listSkillComparisons("p1")).toHaveLength(1);
    expect([await serve("a"), await serve("b"), await serve("c")]).toEqual([
      1, 2, 1,
    ]);
    expect(await serve("a")).toBe(1);
    expect(await serve("b")).toBe(2);
  });

  it("counts each version's finished runs and says when both have enough", async () => {
    await start(2, 1);
    // a and b are served; the run's claim uses the version its actor was served.
    expect(await serve("u1")).toBe(1);
    await finish("t1", "done");
    const [first] = await listSkillComparisons("p1");
    expect(first).toMatchObject({
      oldRuns: 1,
      oldDone: 1,
      newRuns: 0,
      ready: false,
    });
  });

  it("closes a comparison once and only once", async () => {
    await start(2, 1);
    const [cmp] = await listSkillComparisons("p1");
    const decide = () =>
      decideSkillComparison({
        projectId: "p1",
        comparisonId: cmp?.id ?? 0,
        winner: "new",
        actorUserId: "u1",
      });
    expect(await decide()).toBe(true);
    expect(await decide()).toBe(false);
    expect(await listSkillComparisons("p1")).toEqual([]);
  });
});
