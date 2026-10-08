import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectTask } from "@/lib/projects/tasks/createProjectTask";
import {
  projectTaskRecordFixture,
  projectTaskSeat,
} from "@/lib/projects/tasks/projectTask.fixtures";

const h = vi.hoisted(() => ({
  writer: vi.fn(),
  refs: vi.fn(),
  hourly: vi.fn(),
  rows: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("@/lib/projects/tasks/authorizeProjectTaskWriter", () => ({
  authorizeProjectTaskWriter: h.writer,
}));
vi.mock("@/lib/projects/tasks/validateProjectTaskRefs", () => ({
  validateProjectTaskRefs: h.refs,
}));
vi.mock("@/lib/projects/tasks/projectTaskRecordReadQueries", () => ({
  loadProjectTaskHourlyCreates: h.hourly,
  countProjectTaskRecords: h.rows,
}));
vi.mock("@/lib/projects/tasks/projectTaskRecordWriteQueries", () => ({
  insertProjectTaskRecord: h.insert,
}));

const args = {
  projectId: "p1",
  title: "Ship DF-024",
  stage: "build",
  dependsOn: ["t0"],
};

describe("createProjectTask (DF-024 caps)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    h.writer.mockResolvedValue({
      ok: true,
      ownerUserId: "owner-1",
      membership: projectTaskSeat(),
    });
    h.refs.mockResolvedValue({ ok: true });
    h.hourly.mockResolvedValue({ count: 0, oldestAt: null });
    h.rows.mockResolvedValue(0);
    h.insert.mockResolvedValue(projectTaskRecordFixture({ stage: "build" }));
  });

  it("caps: 300/h per caller and 500 rows per project", async () => {
    h.hourly.mockResolvedValueOnce({
      count: 300,
      oldestAt: new Date("2026-10-07T10:00:00Z"),
    });
    const limited = await createProjectTask({
      actorUserId: "bot-user",
      args,
      now: new Date("2026-10-07T10:30:00Z"),
    });
    expect(limited).toMatchObject({ ok: false, code: "rate_limited" });
    h.rows.mockResolvedValueOnce(500);
    expect(await createProjectTask({ actorUserId: "bot-user", args })).toEqual({
      ok: false,
      code: "task_cap_reached",
      limit: 500,
      hint: expect.stringContaining("500"),
    });
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("description > 200 rejected before auth", async () => {
    const r = await createProjectTask({
      actorUserId: "bot-user",
      args: { ...args, description: "x".repeat(201) },
    });
    expect(r).toEqual({ ok: false, code: "description_too_long" });
    expect(h.writer).not.toHaveBeenCalled();
  });
});
