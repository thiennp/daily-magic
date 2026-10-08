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

const run = (args: Record<string, unknown>) =>
  updateProjectTask({
    actorUserId: "bot-user",
    args: { projectId: "p1", taskId: "task-1", ...args },
  });

const done = projectTaskRecordFixture({
  status: "done",
  doneAt: "2026-10-07T12:00:00.000Z",
  tipSha: "abc1234",
});

describe("updateProjectTask — S4 done idempotent, S1 no-op / CAS", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    h.writer.mockResolvedValue({
      ok: true,
      ownerUserId: "owner-1",
      membership: projectTaskSeat(),
    });
    h.refs.mockResolvedValue({ ok: true });
    h.update.mockImplementation(async (input: { values: object }) => ({
      ...projectTaskRecordFixture(),
      ...input.values,
    }));
  });

  it("retrying done on a done task returns ok with the stored task, no write", async () => {
    h.load.mockResolvedValue(done);
    expect(await run({ status: "done" })).toEqual({ ok: true, task: done });
    expect(await run({ status: "done", tipSha: "abc1234" })).toEqual({
      ok: true,
      task: done,
    });
    expect(h.update).not.toHaveBeenCalled();
  });

  it("a real change to a done task is still task_done", async () => {
    h.load.mockResolvedValue(done);
    expect(await run({ status: "done", title: "Renamed" })).toEqual({
      ok: false,
      code: "task_done",
    });
    expect(h.update).not.toHaveBeenCalled();
  });

  it("an unchanged edit on an open task writes nothing (updated_at kept)", async () => {
    const open = projectTaskRecordFixture();
    h.load.mockResolvedValue(open);
    expect(await run({ title: open.title, status: "queued" })).toEqual({
      ok: true,
      task: open,
    });
    expect(h.update).not.toHaveBeenCalled();
  });

  it("a change writes with CAS on the read status + updatedAt", async () => {
    const open = projectTaskRecordFixture();
    h.load.mockResolvedValue(open);
    await run({ title: "New title" });
    expect(h.update).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedStatus: "queued",
        expectedUpdatedAt: open.updatedAt,
      }),
    );
  });
});
