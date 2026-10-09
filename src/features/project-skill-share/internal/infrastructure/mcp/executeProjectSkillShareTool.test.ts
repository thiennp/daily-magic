import { describe, expect, it, vi } from "vitest";

import { executeProjectSkillShareTool } from "@/features/project-skill-share/internal/infrastructure/mcp/executeProjectSkillShareTool";
import { revokeProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/recordProjectSkillLookup",
  () => ({ recordProjectSkillLookup: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill",
  () => ({ revokeProjectSkill: vi.fn() }),
);

const actor = { id: "u1" } as AgentAccessActor;
const TOOLS = [
  "publish_project_skill",
  "list_project_skills",
  "get_project_skill",
  "revoke_project_skill",
];

describe("executeProjectSkillShareTool", () => {
  it("returns null for tools it does not own", async () => {
    expect(
      await executeProjectSkillShareTool({
        actor,
        name: "project_dispatch",
        args: {},
      }),
    ).toBeNull();
  });

  it("maps orchestrator failures to tool errors", async () => {
    vi.mocked(revokeProjectSkill).mockResolvedValue({
      ok: false,
      code: "forbidden",
    });
    const result = await executeProjectSkillShareTool({
      actor,
      name: "revoke_project_skill",
      args: { projectId: "p", skillId: "s" },
    });
    expect(result?.isError).toBe(true);
    expect(JSON.parse(result?.text ?? "{}")).toMatchObject({
      ok: false,
      code: "forbidden",
    });
    expect(revokeProjectSkill).toHaveBeenCalledWith({
      actorUserId: "u1",
      args: { projectId: "p", skillId: "s" },
    });
  });

  it("tools are in the MCP catalog and the awc_proj_ allowlist", () => {
    const names = AGENT_ACCESS_TOOLS.map((tool) => tool.name);
    TOOLS.forEach((name) => {
      expect(names).toContain(name);
      expect(isProjectApiKeyMcpTool(name)).toBe(true);
    });
  });
});
