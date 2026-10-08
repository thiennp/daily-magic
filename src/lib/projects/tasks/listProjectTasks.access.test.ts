import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectTasks } from "@/lib/projects/tasks/listProjectTasks";
import { listProjectTaskRow } from "@/lib/projects/tasks/listProjectTasks.fixtures";
import { projectTaskSeat } from "@/lib/projects/tasks/projectTask.fixtures";

const h = vi.hoisted(() => ({
  seat: vi.fn(),
  rows: [] as Record<string, unknown>[],
  calls: [] as { text: string; values: unknown[] }[],
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "p1" ? { id: "p1", ownerUserId: "owner-1" } : null,
  ),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: h.seat,
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

const run = (args: unknown, actorUserId = "bot-user") =>
  listProjectTasks({ actorUserId, args });

describe("listProjectTasks — access + meta shape", () => {
  beforeEach(() => {
    h.seat.mockReset().mockResolvedValue(null);
    h.rows = [];
    h.calls.length = 0;
  });

  it("owner gets this project's tasks only, newest updated first", async () => {
    h.rows = [listProjectTaskRow("task-2")];
    const result = await run({ projectId: "p1" }, "owner-1");
    expect(result).toMatchObject({ ok: true, nextCursor: null });
    const call = h.calls[0];
    expect(call?.text).toContain("WHERE t.project_id = ?::text");
    expect(call?.values[0]).toBe("p1");
    expect(call?.text).toContain("ORDER BY t.updated_at DESC, t.id DESC");
    expect(h.seat).not.toHaveBeenCalled();
  });

  it("active member (incl. viewer) is allowed; output is meta only", async () => {
    h.seat.mockResolvedValue(projectTaskSeat({ role: "viewer" }));
    h.rows = [listProjectTaskRow("task-2")];
    const result = await run({ projectId: "p1" });
    if (!result.ok) throw new Error("expected ok");
    expect(result.tasks).toEqual([
      {
        id: "task-2",
        title: "Task task-2",
        description: "short",
        status: "in_progress",
        priority: "p1",
        stage: "build",
        ownerMembershipId: "seat-bot",
        ownerProjectDisplayName: "Kai",
        dependsOn: ["task-0"],
        tipSha: "abc1234",
        createdAt: "2026-10-07T10:00:00.000Z",
        updatedAt: "2026-10-07T10:05:00.000Z",
      },
    ]);
  });

  it("non-member / pending member → forbidden; missing project → not_found", async () => {
    expect(await run({ projectId: "p1" })).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(await run({ projectId: "nope" })).toEqual({
      ok: false,
      code: "not_found",
    });
    expect(h.calls).toHaveLength(0);
  });
});
