import { describe, expect, it } from "vitest";

import {
  canMoveProjectTask,
  groupProjectTasksForBoard,
} from "@/features/projects/tasks/utils/projectTaskBoard";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

describe("groupProjectTasksForBoard", () => {
  it("puts each record in its status column, newest first", () => {
    const grouped = groupProjectTasksForBoard([
      projectTaskRecordFixture({
        id: "a",
        status: "queued",
        updatedAt: "2026-01-01",
      }),
      projectTaskRecordFixture({
        id: "b",
        status: "queued",
        updatedAt: "2026-02-01",
      }),
      projectTaskRecordFixture({ id: "c", status: "done" }),
    ]);
    expect(grouped.queued.map((r) => r.id)).toEqual(["b", "a"]);
    expect(grouped.done.map((r) => r.id)).toEqual(["c"]);
    expect(grouped.blocked).toEqual([]);
  });
});

describe("canMoveProjectTask", () => {
  it("follows the status FSM and rejects same-column drops", () => {
    expect(canMoveProjectTask("queued", "in_progress")).toBe(true);
    expect(canMoveProjectTask("in_progress", "done")).toBe(true);
    expect(canMoveProjectTask("done", "queued")).toBe(true);
    expect(canMoveProjectTask("queued", "done")).toBe(false);
    expect(canMoveProjectTask("queued", "queued")).toBe(false);
  });
});
