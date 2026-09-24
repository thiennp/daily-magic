import { describe, expect, it } from "vitest";

import { executeAgentAccessWorkflowTool } from "@/lib/agentAccess/executeAgentAccessWorkflowTool";
import { listAgentAccessWorkflowTemplates } from "@/lib/agentAccess/listAgentAccessWorkflowTemplates";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const actor: AgentAccessActor = {
  id: "user-1",
  email: "agt@agents.agentwitch.com",
  globalRole: "user",
  name: "Grok",
  registrationMethod: "none",
};

describe("agent access workflows", () => {
  it("lists workflow templates with fields and a Playbook slug", () => {
    const templates = listAgentAccessWorkflowTemplates();

    expect(templates.length).toBeGreaterThan(0);
    expect(templates.every((template) => template.harnessSlug.length > 0)).toBe(
      true,
    );
    expect(templates[0]?.fields.length).toBeGreaterThan(0);
  });

  it("rejects create, install, and run calls that omit ids", async () => {
    const created = await executeAgentAccessWorkflowTool({
      actor,
      name: "create_workflow",
      args: {},
    });
    const installed = await executeAgentAccessWorkflowTool({
      actor,
      name: "install_harness",
      args: {},
    });
    const started = await executeAgentAccessWorkflowTool({
      actor,
      name: "run_workflow",
      args: { capabilityId: "cap-1" },
    });
    const listed = await executeAgentAccessWorkflowTool({
      actor,
      name: "list_workflow_templates",
      args: {},
    });

    expect(created?.text).toContain("templateId is required");
    expect(installed?.text).toContain("capabilityId is required");
    expect(started?.text).toContain("fieldValues");
    expect(listed?.text).toContain("harnessSlug");
  });

  it("ignores tools that belong to other handlers", async () => {
    const result = await executeAgentAccessWorkflowTool({
      actor,
      name: "send_task",
      args: {},
    });

    expect(result).toBeNull();
  });
});
