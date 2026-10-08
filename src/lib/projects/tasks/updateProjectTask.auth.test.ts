import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  projectTaskRecordFixture,
  projectTaskSeat,
} from "@/lib/projects/tasks/projectTask.fixtures";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

const h = vi.hoisted(() => ({
  writer: vi.fn(),
  load: vi.fn(),
  refs: vi.fn(),
  update: vi.fn(),
}));

vi.mock("@/lib/projects/tasks/authorizeProjectTaskWriter", () => ({
  authorizeProjectTaskWriter: h.writer,
}));
vi.mock("@/lib/projects/tasks/projectTaskRecordReadQueries", () => ({
  loadProjectTaskRecord: h.load,
}));
vi.mock("@/lib/projects/tasks/validateProjectTaskRefs", () => ({
  validateProjectTaskRefs: h.refs,
}));
vi.mock("@/lib/projects/tasks/notifyProjectTaskChanged", () => ({
  notifyProjectTaskChanged: vi.fn(async () => 0),
}));
vi.mock("@/lib/projects/tasks/projectTaskRecordWriteQueries", () => ({
  updateProjectTaskRecord: h.update,
}));

const run = (args: Record<string, unknown>, actorUserId = "bot-user") =>
  updateProjectTask({
    actorUserId,
    args: { projectId: "p1", taskId: "task-1", ...args },
  });

describe("updateProjectTask (DF-024 auth)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    h.writer.mockResolvedValue({
      ok: true,
      ownerUserId: "owner-1",
      membership: projectTaskSeat(),
    });
    h.load.mockResolvedValue(projectTaskRecordFixture());
    h.refs.mockResolvedValue({ ok: true });
    h.update.mockImplementation(async (input: { values: object }) => ({
      ...projectTaskRecordFixture(),
      ...input.values,
    }));
  });

  it("any writer (owner, member, bot) edits any task, even one it did not create", async () => {
    h.load.mockResolvedValue(
      projectTaskRecordFixture({
        createdByUserId: "u9",
        ownerMembershipId: "s9",
      }),
    );
    expect(await run({ priority: "p0" })).toMatchObject({
      ok: true,
      task: { priority: "p0" },
    });
    h.writer.mockResolvedValue({
      ok: true,
      ownerUserId: "owner-1",
      membership: null,
    });
    expect(
      await run({ priority: "p1", stage: "design" }, "owner-1"),
    ).toMatchObject({
      ok: true,
      task: { priority: "p1", stage: "design" },
    });
  });

  it("viewer → viewer_read_only before any read", async () => {
    h.writer.mockResolvedValueOnce({ ok: false, code: "viewer_read_only" });
    expect(await run({ status: "planned" }, "viewer")).toEqual({
      ok: false,
      code: "viewer_read_only",
    });
    expect(h.load).not.toHaveBeenCalled();
  });
});
