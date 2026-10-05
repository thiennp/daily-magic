import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_STATUS_FORBIDDEN } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { guardProjectApiKeyToolUse } from "@/lib/agentAccess/guardProjectApiKeyToolUse";
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

describe("guardProjectApiKeyToolUse", () => {
  it("allows list_project_peers for matching projectId", () => {
    expect(
      guardProjectApiKeyToolUse({
        name: "list_project_peers",
        args: { projectId: "proj-1" },
        projectAuth,
      }),
    ).toBeNull();
  });

  it("forbids non-project tools like whoami", () => {
    const result = guardProjectApiKeyToolUse({
      name: "whoami",
      args: {},
      projectAuth,
    });
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain("forbidden");
  });

  it("forbids get_my_project_webhook_status (agent-access Bearer only)", () => {
    const result = guardProjectApiKeyToolUse({
      name: "get_my_project_webhook_status",
      args: { projectId: "proj-1" },
      projectAuth,
    });
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain(
      "Project API key cannot call this tool. Use agent-access Bearer for full MCP, or a project-scoped tool.",
    );
    // The status copy quotes the guard's error prefix verbatim.
    const quoted = /'([^']+)'/.exec(AWC_GROK_WEBHOOK_STATUS_FORBIDDEN)?.[1];
    expect(quoted).toBe("Project API key cannot call this tool");
    expect(result?.text).toContain(quoted);
  });

  it("forbids mismatched projectId", () => {
    const result = guardProjectApiKeyToolUse({
      name: "get_project_acl",
      args: { projectId: "other-proj" },
      projectAuth,
    });
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain("not valid for this projectId");
  });
});
