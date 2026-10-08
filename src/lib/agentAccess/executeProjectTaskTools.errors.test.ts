import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeProjectTaskTools } from "@/lib/agentAccess/executeProjectTaskTools";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const h = vi.hoisted(() => ({ create: vi.fn(), update: vi.fn() }));

vi.mock("@/lib/projects/tasks/createProjectTask", () => ({
  createProjectTask: h.create,
}));
vi.mock("@/lib/projects/tasks/updateProjectTask", () => ({
  updateProjectTask: h.update,
}));

const actor = { id: "bot-user" } as AgentAccessActor;
const call = (name: string) =>
  executeProjectTaskTools({ actor, name, args: {} });
const parse = (r: Awaited<ReturnType<typeof executeProjectTaskTools>>) =>
  JSON.parse(r?.text ?? "null") as Record<string, unknown>;

describe("executeProjectTaskTools — S6 / S7 / cap payload (DF-024 r2)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("S6: the task in tool output never carries createdByUserId", async () => {
    h.update.mockResolvedValueOnce({
      ok: true,
      task: projectTaskRecordFixture(),
    });
    const task = parse(await call("update_project_task")).task;
    expect(task).not.toHaveProperty("createdByUserId");
    expect(task).toMatchObject({ id: "task-1" });
  });

  it("S7: a client-caused DB error is a tool error, not a throw", async () => {
    h.create.mockRejectedValueOnce(
      Object.assign(new Error("fk"), { code: "23503" }),
    );
    const r = await call("create_project_task");
    expect(r?.isError).toBe(true);
    expect(parse(r)).toEqual({
      ok: false,
      code: "invalid_reference",
      error: "invalid_reference",
    });
    h.create.mockRejectedValueOnce(new Error("connection reset"));
    await expect(call("create_project_task")).rejects.toThrow(
      "connection reset",
    );
  });

  it("(c) task_cap_reached passes limit + hint through", async () => {
    h.create.mockResolvedValueOnce({
      ok: false,
      code: "task_cap_reached",
      limit: 500,
      hint: "Project has 500 tasks. Mark tasks done or remove obsolete rows to create new ones.",
    });
    expect(parse(await call("create_project_task"))).toMatchObject({
      error: "task_cap_reached",
      limit: 500,
      hint: expect.stringContaining("500"),
    });
  });
});
