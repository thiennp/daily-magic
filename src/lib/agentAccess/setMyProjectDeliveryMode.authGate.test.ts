import { describe, expect, it } from "vitest";

import { AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS } from "@/lib/agentAccess/agentAccessProjectInviteHooksToolCatalog.constant";
import { guardProjectApiKeyToolUse } from "@/lib/agentAccess/guardProjectApiKeyToolUse";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";
import type { ProjectApiKeyAuth } from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor";

const projectAuth: ProjectApiKeyAuth = {
  keyId: "key-1",
  projectId: "proj-1",
  membershipId: "mem-1",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  actor: {
    id: "bot-1",
    email: "bot@agents.agentwitch.com",
    name: "Buni",
    globalRole: "user",
    registrationMethod: "none",
  },
};

describe("set_my_project_delivery_mode auth gate", () => {
  it("is not on the awc_proj_ project-key allowlist (agent-access Bearer only)", () => {
    expect(isProjectApiKeyMcpTool("set_my_project_delivery_mode")).toBe(false);
    const result = guardProjectApiKeyToolUse({
      name: "set_my_project_delivery_mode",
      args: { projectId: "proj-1", deliveryMode: "poll" },
      projectAuth,
    });
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain("forbidden");
  });
});

describe("list_project_inbox catalog copy", () => {
  it("states webhook vs poll (Checks on demand) call rules", () => {
    const tool = AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS.find(
      (t) => t.name === "list_project_inbox",
    );
    expect(tool?.description).toContain(
      "In webhook mode, call only after posting task.received from the wake payload. In poll mode (Checks on demand) there is no wake: call when your user asks, at most once a minute.",
    );
  });
});
