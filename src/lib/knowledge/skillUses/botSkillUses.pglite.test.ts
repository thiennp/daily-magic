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
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema", () => ({
  ensureProjectSkillChecksSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillUsesSchema", () => ({
  ensureProjectSkillUsesSchema: async () => undefined,
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

describe("skill uses of assistant runs (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createBotKnowledgeDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetBotKnowledgeDb(state.db as PGlite);
  });

  it("records the assigned skill and a fetched skill with their published versions", async () => {
    const db = state.db as PGlite;
    await publishSkill(db, "deploy", 3);
    await publishSkill(db, "review", 2);
    await publishSkill(db, "old", 1, "revoked");
    await logSkillGet(db, "review");
    await logSkillGet(db, "old");
    await claimTask("t1", "deploy");
    await claimTask("t1", "deploy");
    expect(await skillUseRows(db)).toEqual([
      expect.objectContaining({
        skill_id: "deploy",
        skill_version: 3,
        source: "assigned",
      }),
      expect.objectContaining({
        skill_id: "review",
        skill_version: 2,
        source: "lookup",
      }),
    ]);
  });

  it("records nothing when no skill was assigned or fetched", async () => {
    await claimTask("t2");
    expect(await skillUseRows(state.db as PGlite)).toEqual([]);
  });

  it("stores the run outcome and a failure fingerprint on release", async () => {
    const db = state.db as PGlite;
    await publishSkill(db, "deploy", 1);
    await claimTask("t3", "deploy");
    await recordBotRelease({
      projectId: "p1",
      taskId: "t3",
      fence: 1,
      outcome: "failed",
      verifySignal: null,
      reason: "tests failed on step two",
    });
    const [row] = await skillUseRows(db);
    expect(row?.outcome).toBe("failed");
    expect(row?.reason_fingerprint).toEqual(expect.any(String));
  });
});
