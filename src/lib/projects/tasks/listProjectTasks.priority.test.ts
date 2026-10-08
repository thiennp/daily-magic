import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectTasks } from "@/lib/projects/tasks/listProjectTasks";
import { listProjectTaskRow } from "@/lib/projects/tasks/listProjectTasks.fixtures";
import { decodeProjectTaskPriorityCursor } from "@/lib/projects/tasks/projectTaskPriorityCursor";

const h = vi.hoisted(() => ({
  rows: [] as Record<string, unknown>[],
  calls: [] as { text: string; values: unknown[] }[],
  seat: null as { id: string } | null,
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "p1", ownerUserId: "owner-1" })),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => h.seat),
}));
vi.mock("@/lib/projects/tasks/ensureProjectTaskRecordsSchema", () => ({
  ensureProjectTaskRecordsSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/db", async () => {
  const f = await import("@/lib/projects/tasks/listProjectTasks.fixtures");
  return {
    getSql: f.recordingSql(h.calls, () => h.rows),
    asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
  };
});

const run = (args: unknown) =>
  listProjectTasks({ actorUserId: "owner-1", args });

describe("listProjectTasks — sort priority / mine", () => {
  beforeEach(() => {
    h.rows = [];
    h.calls.length = 0;
    h.seat = null;
  });

  it("priority page carries (rank, created_at, id) into nextCursor and back", async () => {
    h.rows = [
      listProjectTaskRow("a", { priority_rank: 0 }),
      listProjectTaskRow("b", { priority_rank: 1 }),
    ];
    const page = await run({ projectId: "p1", sort: "priority", limit: 1 });
    if (!page.ok || page.nextCursor === null) throw new Error("expected page");
    expect(h.calls[0]?.text).toContain("priority_rank ASC");
    expect(decodeProjectTaskPriorityCursor(page.nextCursor)).toEqual({
      rank: 0,
      at: "2026-10-07T10:05:00.123456Z",
      id: "a",
    });
    await run({ projectId: "p1", sort: "priority", cursor: page.nextCursor });
    expect(h.calls[1]?.values).toContain(0);
    expect(h.calls[1]?.values).toContain("a");
  });

  it("an updated-sort cursor is invalid under sort priority", async () => {
    expect(
      await run({ projectId: "p1", sort: "priority", cursor: "eHw5" }),
    ).toEqual({ ok: false, code: "invalid_cursor" });
    expect(await run({ projectId: "p1", sort: "oldest" })).toEqual({
      ok: false,
      code: "invalid_sort",
    });
  });

  it("mine filters by the caller seat; no seat → empty without querying", async () => {
    expect(await run({ projectId: "p1", mine: true })).toEqual({
      ok: true,
      tasks: [],
      nextCursor: null,
    });
    expect(h.calls).toHaveLength(0);
    h.seat = { id: "seat-9" };
    await run({ projectId: "p1", mine: true });
    expect(h.calls[0]?.values).toContain("seat-9");
  });

  it("ownerMembershipId overrides mine", async () => {
    h.seat = { id: "seat-9" };
    await run({ projectId: "p1", mine: true, ownerMembershipId: "seat-2" });
    expect(h.calls[0]?.values).toContain("seat-2");
    expect(h.calls[0]?.values).not.toContain("seat-9");
  });
});
