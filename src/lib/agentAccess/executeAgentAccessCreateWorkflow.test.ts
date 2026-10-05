import { describe, expect, it, vi } from "vitest";

import { executeAgentAccessCreateWorkflow } from "@/lib/agentAccess/executeAgentAccessCreateWorkflow";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const mocks = vi.hoisted(() => ({
  createCapabilityFromTemplate: vi.fn(),
}));

vi.mock("@/lib/capabilities/createCapabilityFromTemplate", () => ({
  default: mocks.createCapabilityFromTemplate,
}));

const actor: AgentAccessActor = {
  id: "user-1",
  email: "agt@agents.agentwitch.com",
  globalRole: "user",
  name: "Grok",
  registrationMethod: "none",
};

describe("executeAgentAccessCreateWorkflow", () => {
  it("rejects missing project_id", async () => {
    const result = await executeAgentAccessCreateWorkflow({
      actor,
      args: { templateId: "tpl-1" },
    });

    expect(result.text).toContain("project_id is required");
    expect(result.text).toContain("project_required");
    expect(mocks.createCapabilityFromTemplate).not.toHaveBeenCalled();
  });

  it("passes project_id into the shared create seam", async () => {
    mocks.createCapabilityFromTemplate.mockResolvedValue({
      ok: true,
      capability: { id: "cap-1", name: "Demo" },
      projectId: "proj-1",
      harnessInstalled: false,
      harnessInstallMessage: null,
    });

    const result = await executeAgentAccessCreateWorkflow({
      actor,
      args: { templateId: "tpl-1", project_id: "proj-1" },
    });

    expect(mocks.createCapabilityFromTemplate).toHaveBeenCalledWith({
      ownerUserId: "user-1",
      templateId: "tpl-1",
      projectId: "proj-1",
      deviceId: undefined,
    });
    expect(result.text).toContain("cap-1");
  });
});
