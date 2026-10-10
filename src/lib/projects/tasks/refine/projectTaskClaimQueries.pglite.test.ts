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
  claimProjectTaskRefinement,
  finishProjectTaskClaim,
} from "@/lib/projects/tasks/refine/projectTaskClaimQueries";
import {
  createRefinementDb,
  resetRefinementDb,
} from "@/lib/projects/tasks/refine/projectTaskRefinementPglite.fixtures";

const none = {
  attemptsDelta: 0,
  blockCountDelta: 0,
  effortTier: null,
  blockedOn: null,
  verifySignal: null,
} as const;
const claim = (userId: string) =>
  claimProjectTaskRefinement({
    projectId: "p1",
    taskId: "t1",
    userId,
    leaseMs: 60_000,
  });

describe("task claim queries (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createRefinementDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetRefinementDb(state.db as PGlite);
  });

  it("first claimer wins, others are refused, the holder renews", async () => {
    expect((await claim("a"))?.claimFence).toBe(1);
    expect(await claim("b")).toBeNull();
    expect((await claim("a"))?.claimFence).toBe(2);
  });

  it("an expired lease is taken over and the old holder's fence is rejected", async () => {
    const first = await claim("a");
    await state.db?.exec(
      `UPDATE project_task_refinement SET lease_expires_at = NOW() - interval '1 minute'`,
    );
    const second = await claim("b");
    expect(second?.claimFence).toBe((first?.claimFence ?? 0) + 1);
    expect(
      await finishProjectTaskClaim({
        taskId: "t1",
        userId: "a",
        fence: first?.claimFence ?? 0,
        outcome: none,
      }),
    ).toBeNull();
    const done = await finishProjectTaskClaim({
      taskId: "t1",
      userId: "b",
      fence: second?.claimFence ?? 0,
      outcome: {
        ...none,
        attemptsDelta: 1,
        effortTier: "medium",
        verifySignal: "exit_code",
      },
    });
    expect(done).toMatchObject({
      claimedByUserId: null,
      attempts: 1,
      effortTier: "medium",
      verifySignal: "exit_code",
    });
    expect((await claim("c"))?.claimFence).toBe((second?.claimFence ?? 0) + 1);
  });
});
