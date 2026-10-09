import { beforeEach, describe, expect, it, vi } from "vitest";

import { recordProjectSkillLookup } from "@/features/project-skill-share/internal/infrastructure/db/recordProjectSkillLookup";
import { executeProjectSkillShareTool } from "@/features/project-skill-share/internal/infrastructure/mcp/executeProjectSkillShareTool";
import { listProjectSkillsTool } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkillsTool";
import { revokeProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/recordProjectSkillLookup",
  () => ({ recordProjectSkillLookup: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkillsTool",
  () => ({ listProjectSkillsTool: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill",
  () => ({ revokeProjectSkill: vi.fn() }),
);

const actor = { id: "u1" } as AgentAccessActor;

describe("executeProjectSkillShareTool lookup log", () => {
  beforeEach(() => vi.clearAllMocks());

  it("logs a successful query lookup as metadata only", async () => {
    vi.mocked(listProjectSkillsTool).mockResolvedValue({
      ok: true,
      matches: [{ skillId: "a", name: "A", description: "", tags: [] }],
      total: 1,
    } as never);
    await executeProjectSkillShareTool({
      actor,
      name: "list_project_skills",
      args: { projectId: "p1", query: "private task text" },
    });
    expect(recordProjectSkillLookup).toHaveBeenCalledTimes(1);
    const logged = JSON.stringify(
      vi.mocked(recordProjectSkillLookup).mock.calls[0]?.[0],
    );
    expect(logged).toContain('"actorUserId":"u1"');
    expect(logged).toContain('"queryChars":17');
    expect(logged).not.toContain("private task text");
  });

  it("does not log failures or tools that are not lookups", async () => {
    vi.mocked(listProjectSkillsTool).mockResolvedValue({
      ok: false,
      code: "forbidden",
    });
    await executeProjectSkillShareTool({
      actor,
      name: "list_project_skills",
      args: { projectId: "p1" },
    });
    vi.mocked(revokeProjectSkill).mockResolvedValue({ ok: true } as never);
    await executeProjectSkillShareTool({
      actor,
      name: "revoke_project_skill",
      args: { projectId: "p1", skillId: "s" },
    });
    expect(recordProjectSkillLookup).not.toHaveBeenCalled();
  });
});
