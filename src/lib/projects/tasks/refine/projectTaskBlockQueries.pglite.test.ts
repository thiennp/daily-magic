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
  "@/lib/projects/tasks/refine/ensureProjectTaskRefinementSchema",
  () => ({
    ensureProjectTaskRefinementSchema: async () => undefined,
  }),
);

import {
  handOffStaleSkillBlocks,
  listSkillBlockedTasks,
} from "@/lib/projects/tasks/refine/projectTaskBlockQueries";
import {
  createRefinementDb,
  resetRefinementDb,
} from "@/lib/projects/tasks/refine/projectTaskRefinementPglite.fixtures";
import { setProjectTaskStatusDerived } from "@/lib/projects/tasks/refine/projectTaskStatusSyncQueries";

describe("task block + derived status queries (PGlite)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createRefinementDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetRefinementDb(state.db as PGlite);
  });

  it("lists skill-blocked tasks and hands the stale ones to a person", async () => {
    await state.db?.exec(
      `UPDATE project_task_records SET status = 'blocked', blocked_at = NOW() - interval '30 hours' WHERE id = 't1'`,
    );
    await state.db?.exec(
      `INSERT INTO project_task_refinement (task_id, project_id, blocked_on, block_count) VALUES ('t1', 'p1', 'skill', 1)`,
    );
    expect(await listSkillBlockedTasks("p1")).toHaveLength(1);
    expect(
      await handOffStaleSkillBlocks({ projectId: "p1", hours: 24 }),
    ).toEqual(["t1"]);
    expect(await listSkillBlockedTasks("p1")).toHaveLength(0);
  });

  it("derived status moves never touch a cancelled task", async () => {
    expect(
      await setProjectTaskStatusDerived({
        projectId: "p1",
        taskId: "t1",
        status: "in_progress",
      }),
    ).toBe(true);
    await state.db?.exec(
      `UPDATE project_task_records SET status = 'cancelled' WHERE id = 't1'`,
    );
    expect(
      await setProjectTaskStatusDerived({
        projectId: "p1",
        taskId: "t1",
        status: "done",
      }),
    ).toBe(false);
  });
});
