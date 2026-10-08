import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_ACCESS_PROJECT_ACL_TOOLS } from "@/lib/agentAccess/agentAccessProjectAclToolCatalog.constant";
import { executeProjectTaskTools } from "@/lib/agentAccess/executeProjectTaskTools";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

const h = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  list: vi.fn(),
}));

vi.mock("@/lib/projects/tasks/createProjectTask", () => ({
  createProjectTask: h.create,
}));
vi.mock("@/lib/projects/tasks/updateProjectTask", () => ({
  updateProjectTask: h.update,
}));
vi.mock("@/lib/projects/tasks/listProjectTasks", () => ({
  listProjectTasks: h.list,
}));

const actor = { id: "bot-user" } as AgentAccessActor;
const parse = (r: Awaited<ReturnType<typeof executeProjectTaskTools>>) =>
  JSON.parse(r?.text ?? "null") as Record<string, unknown>;

describe("executeProjectTaskTools (DF-024)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers the task tools in the agent-access catalog and project-key allowlist", () => {
    const names = AGENT_ACCESS_PROJECT_ACL_TOOLS.map((t) => t.name);
    for (const name of [
      "create_project_task",
      "update_project_task",
      "list_project_tasks",
    ]) {
      expect(names).toContain(name);
      expect(isProjectApiKeyMcpTool(name)).toBe(true);
    }
  });

  it("list → tasks + nextCursor; forbidden carries code + isError", async () => {
    const page = { ok: true, tasks: [{ id: "t1" }], nextCursor: null };
    h.list.mockResolvedValueOnce(page);
    const ok = await executeProjectTaskTools({
      actor,
      name: "list_project_tasks",
      args: { projectId: "p1" },
    });
    expect(parse(ok)).toEqual(page);
    expect(h.list).toHaveBeenCalledWith({
      actorUserId: "bot-user",
      args: { projectId: "p1" },
    });
    h.list.mockResolvedValueOnce({ ok: false, code: "forbidden" });
    const denied = await executeProjectTaskTools({
      actor,
      name: "list_project_tasks",
      args: { projectId: "p1" },
    });
    expect(denied?.isError).toBe(true);
    expect(parse(denied)).toEqual({
      ok: false,
      code: "forbidden",
      error: "forbidden",
    });
  });

  it("create → task payload; errors carry code + isError", async () => {
    h.create.mockResolvedValueOnce({ ok: true, task: { id: "t1" } });
    const ok = await executeProjectTaskTools({
      actor,
      name: "create_project_task",
      args: {},
    });
    expect(parse(ok)).toEqual({ ok: true, task: { id: "t1" } });
    expect(h.create).toHaveBeenCalledWith({
      actorUserId: "bot-user",
      args: {},
    });
    h.update.mockResolvedValueOnce({ ok: false, code: "invalid_transition" });
    const bad = await executeProjectTaskTools({
      actor,
      name: "update_project_task",
      args: {},
    });
    expect(bad?.isError).toBe(true);
    expect(parse(bad)).toMatchObject({ error: "invalid_transition" });
  });

  it("returns null for other tools", async () => {
    expect(
      await executeProjectTaskTools({
        actor,
        name: "project_dispatch",
        args: {},
      }),
    ).toBeNull();
  });
});
