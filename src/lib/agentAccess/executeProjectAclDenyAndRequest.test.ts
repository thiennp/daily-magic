import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentWitch/listAgentWitchDevicesForUser", () => ({
  listAgentWitchDevicesForUser: vi.fn(async () => []),
}));

vi.mock("@/lib/dispatch/listAgentRunsForUser", () => ({
  listAgentRunsForUser: vi.fn(async () => []),
}));

vi.mock("@/lib/dispatch/getAgentRunForParticipant", () => ({
  getAgentRunForParticipant: vi.fn(async () => null),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (projectId: string) =>
    projectId === "proj-1"
      ? {
          id: "proj-1",
          ownerUserId: "owner-1",
          deviceId: null,
          name: "Demo",
          folderPath: "/tmp",
          lastUsedAt: null,
          createdAt: "2026-10-01T00:00:00.000Z",
          updatedAt: "2026-10-01T00:00:00.000Z",
        }
      : null,
  ),
}));

const actorTokenRow = {
  id: "bot-1",
  email: "agt@agents.agentwitch.com",
  name: "Bot",
  global_role: "user",
  registration_method: "none",
};

describe("agent-access project ACL deny/request", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("deny get_project_acl for non-member", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "get_project_acl",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(true);
    expect(result.text).toContain("forbidden");
  });

  it("request_project_access creates pending", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("SELECT")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        return [
          {
            id: "req-1",
            project_id: "proj-1",
            requester_user_id: "bot-1",
            invited_by_user_id: null,
            reason: null,
            requested_scopes: ["acl:self", "project:meta", "peer_sync"],
            status: "pending",
            decided_by_user_id: null,
            decided_at: null,
            created_at: "2026-10-01T00:00:00.000Z",
            expires_at: "2026-10-15T00:00:00.000Z",
          },
        ];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "request_project_access",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBeFalsy();
    expect(result.text).toContain("pending");
  });
});
