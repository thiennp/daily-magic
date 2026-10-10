import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
  claimFence: 0,
  skillId: null as string | null,
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/tasks/refine/projectTaskRefinementQueries", () => ({
  loadProjectTaskRefinement: async () => ({
    claimFence: holder.claimFence,
    skillId: holder.skillId,
  }),
}));
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillUsesSchema", () => ({
  ensureProjectSkillUsesSchema: async () => undefined,
}));
vi.mock("@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema", () => ({
  ensureProjectSkillChecksSchema: async () => undefined,
}));
vi.mock(
  "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema",
  () => ({
    ensureProjectSkillComparisonsSchema: async () => undefined,
  }),
);
vi.mock("@/lib/knowledge/skillUses/notifySkillCheckDue", () => ({
  notifySkillCheckDue: async () => undefined,
}));

import {
  createBotKnowledgeDb,
  resetBotKnowledgeDb,
} from "@/lib/knowledge/bots/botKnowledgePglite.fixtures";
import { recordSkillUsesOnTaskStatus } from "@/lib/knowledge/skillUses/recordSkillUsesOnTaskStatus";
import {
  logSkillGet,
  publishSkill,
  skillUseRows,
} from "@/lib/knowledge/skillUses/skillUsesPglite.fixtures";

const change = (
  before: "queued" | "in_progress",
  after: "in_progress" | "done" | "blocked",
) =>
  recordSkillUsesOnTaskStatus({
    projectId: "p1",
    taskId: "t1",
    actorUserId: "u1",
    before,
    after,
    blockedReason: after === "blocked" ? "missing access" : null,
  });

describe("skill uses of direct task updates (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createBotKnowledgeDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    holder.claimFence = 0;
    holder.skillId = null;
    await resetBotKnowledgeDb(state.db as PGlite);
    await publishSkill(state.db as PGlite, "review", 2);
    await logSkillGet(state.db as PGlite, "review");
  });

  it("notes the fetched skill when work starts and its outcome when it ends", async () => {
    await change("queued", "in_progress");
    expect(await skillUseRows(state.db as PGlite)).toEqual([
      expect.objectContaining({
        skill_id: "review",
        skill_version: 2,
        outcome: null,
      }),
    ]);
    await change("in_progress", "blocked");
    const [row] = await skillUseRows(state.db as PGlite);
    expect(row).toMatchObject({ outcome: "blocked" });
    expect(row?.reason_fingerprint).toEqual(expect.any(String));
  });

  it("notes a task finished without ever starting", async () => {
    await change("queued", "done");
    expect(await skillUseRows(state.db as PGlite)).toEqual([
      expect.objectContaining({ skill_id: "review", outcome: "done" }),
    ]);
  });

  it("leaves claimed tasks to the claim flow", async () => {
    holder.claimFence = 1;
    await change("queued", "in_progress");
    expect(await skillUseRows(state.db as PGlite)).toEqual([]);
  });

  it("ignores moves that are neither a start nor an end", async () => {
    await recordSkillUsesOnTaskStatus({
      projectId: "p1",
      taskId: "t1",
      actorUserId: "u1",
      before: "queued",
      after: "planned",
      blockedReason: null,
    });
    expect(await skillUseRows(state.db as PGlite)).toEqual([]);
  });
});
