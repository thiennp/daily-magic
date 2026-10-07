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
vi.mock("@/lib/projects/tasks/projectTaskRecordWriteQueries", () => ({
  updateProjectTaskRecord: h.update,
}));

const run = (args: Record<string, unknown>, actorUserId = "bot-user") =>
  updateProjectTask({
    actorUserId,
    args: { projectId: "p1", taskId: "task-1", ...args },
  });

describe("updateProjectTask (DF-024)", () => {
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

  it("allowed transition queued → in_progress writes with CAS on old status", async () => {
    const r = await run({ status: "in_progress", tipSha: "abc1234" });
    expect(r).toMatchObject({
      ok: true,
      task: { status: "in_progress", tipSha: "abc1234" },
    });
    expect(h.update).toHaveBeenCalledWith(
      expect.objectContaining({ expectedStatus: "queued", taskId: "task-1" }),
    );
  });

  it("invalid transition and done-terminal are rejected", async () => {
    expect(await run({ status: "done" })).toEqual({
      ok: false,
      code: "invalid_transition",
    });
    h.load.mockResolvedValueOnce(projectTaskRecordFixture({ status: "done" }));
    expect(await run({ status: "in_progress" })).toEqual({
      ok: false,
      code: "task_done",
    });
    expect(h.update).not.toHaveBeenCalled();
  });

  it("self dependency / unknown task / lost race → clear codes", async () => {
    h.refs.mockResolvedValueOnce({ ok: false, code: "self_dependency" });
    expect(await run({ dependsOn: ["task-1"] })).toEqual({
      ok: false,
      code: "self_dependency",
    });
    h.load.mockResolvedValueOnce(null);
    expect(await run({ status: "planned" })).toEqual({
      ok: false,
      code: "task_not_found",
    });
    h.update.mockResolvedValueOnce(null);
    expect(await run({ status: "planned" })).toEqual({
      ok: false,
      code: "update_conflict",
    });
  });
});
