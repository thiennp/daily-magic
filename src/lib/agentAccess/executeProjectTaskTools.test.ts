import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_ACCESS_PROJECT_ACL_TOOLS } from "@/lib/agentAccess/agentAccessProjectAclToolCatalog.constant";
import { executeProjectTaskTools } from "@/lib/agentAccess/executeProjectTaskTools";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

const h = vi.hoisted(() => ({ create: vi.fn(), update: vi.fn() }));

vi.mock("@/lib/projects/tasks/createProjectTask", () => ({
  createProjectTask: h.create,
}));
vi.mock("@/lib/projects/tasks/updateProjectTask", () => ({
  updateProjectTask: h.update,
}));

const actor = { id: "bot-user" } as AgentAccessActor;
const parse = (r: Awaited<ReturnType<typeof executeProjectTaskTools>>) =>
  JSON.parse(r?.text ?? "null") as Record<string, unknown>;

describe("executeProjectTaskTools (DF-024)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers both tools in the agent-access catalog and project-key allowlist", () => {
    const names = AGENT_ACCESS_PROJECT_ACL_TOOLS.map((t) => t.name);
    expect(names).toContain("create_project_task");
    expect(names).toContain("update_project_task");
    expect(isProjectApiKeyMcpTool("create_project_task")).toBe(true);
    expect(isProjectApiKeyMcpTool("update_project_task")).toBe(true);
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
