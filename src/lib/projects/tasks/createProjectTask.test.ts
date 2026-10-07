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

describe("createProjectTask (DF-024)", () => {
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

  it("member assistant creates; owner seat defaults to caller", async () => {
    const r = await createProjectTask({ actorUserId: "bot-user", args });
    expect(r).toEqual({
      ok: true,
      task: projectTaskRecordFixture({ stage: "build" }),
    });
    expect(h.insert).toHaveBeenCalledWith({
      projectId: "p1",
      createdByUserId: "bot-user",
      createdByMembershipId: "seat-bot",
      values: expect.objectContaining({
        status: "queued",
        ownerMembershipId: "seat-bot",
        stage: "build",
        dependsOn: ["t0"],
        planItemId: null,
        priority: null,
      }),
    });
  });

  it("viewer / non-member denials pass through, nothing written", async () => {
    h.writer.mockResolvedValueOnce({ ok: false, code: "viewer_read_only" });
    expect(await createProjectTask({ actorUserId: "v", args })).toEqual({
      ok: false,
      code: "viewer_read_only",
    });
    h.writer.mockResolvedValueOnce({ ok: false, code: "forbidden" });
    expect(await createProjectTask({ actorUserId: "x", args })).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("ref errors (owner not member / foreign dependsOn) block the write", async () => {
    h.refs.mockResolvedValueOnce({ ok: false, code: "owner_not_member" });
    const r = await createProjectTask({
      actorUserId: "bot-user",
      args: { ...args, ownerMembershipId: "zz" },
    });
    expect(r).toEqual({ ok: false, code: "owner_not_member" });
    h.refs.mockResolvedValueOnce({ ok: false, code: "depends_on_not_found" });
    expect(
      (await createProjectTask({ actorUserId: "bot-user", args })).ok,
    ).toBe(false);
    expect(h.insert).not.toHaveBeenCalled();
  });
});
