import { beforeEach, describe, expect, it, vi } from "vitest";

import { decodeProjectActivityCursor } from "@/lib/projects/acl/activity/projectActivityCursor";
import { listProjectTasks } from "@/lib/projects/tasks/listProjectTasks";
import { listProjectTaskRow } from "@/lib/projects/tasks/listProjectTasks.fixtures";

const h = vi.hoisted(() => ({
  rows: [] as Record<string, unknown>[],
  calls: [] as { text: string; values: unknown[] }[],
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "p1", ownerUserId: "owner-1" })),
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

describe("listProjectTasks — filter + paging", () => {
  beforeEach(() => {
    h.rows = [];
    h.calls.length = 0;
  });

  it("status filter + limit reach the query; extra row → nextCursor", async () => {
    h.rows = ["task-3", "task-2", "task-1"].map((id) => listProjectTaskRow(id));
    const result = await run({ projectId: "p1", status: "BLOCKED", limit: 2 });
    if (!result.ok) throw new Error("expected ok");
    expect(result.tasks.map((t) => t.id)).toEqual(["task-3", "task-2"]);
    expect(h.calls[0]?.text).toContain("t.status = ?::text");
    expect(h.calls[0]?.values).toContain("blocked");
    expect(h.calls[0]?.values).toContain(3);
    expect(decodeProjectActivityCursor(result.nextCursor)).toEqual({
      at: "2026-10-07T10:05:00.123456Z",
      id: "task-2",
    });
  });

  it("cursor is passed as the (updated_at, id) keyset", async () => {
    const first = await run({ projectId: "p1", limit: 1 });
    expect(first).toEqual({ ok: true, tasks: [], nextCursor: null });
    h.rows = [listProjectTaskRow("a"), listProjectTaskRow("b")];
    const page = await run({ projectId: "p1", limit: 1 });
    if (!page.ok || page.nextCursor === null) throw new Error("expected page");
    await run({ projectId: "p1", cursor: page.nextCursor });
    expect(h.calls[2]?.values).toContain("2026-10-07T10:05:00.123456Z");
    expect(h.calls[2]?.values).toContain("a");
  });

  it("bad args are rejected before any lookup", async () => {
    expect(await run(null)).toEqual({ ok: false, code: "invalid_arguments" });
    expect(await run({ projectId: "p1", status: "doing" })).toEqual({
      ok: false,
      code: "invalid_status",
    });
    expect(await run({ projectId: "p1", cursor: "x" })).toEqual({
      ok: false,
      code: "invalid_cursor",
    });
    expect(h.calls).toHaveLength(0);
    const okRun = await run({ projectId: "p1", status: "cancelled" });
    expect(okRun.ok).toBe(true);
  });
});
