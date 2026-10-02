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

vi.mock("@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership", () => ({
  revokeProjectApiKeysForMembership: vi.fn(async () => 0),
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
          repoUrls: [],
          defaultBranch: null,
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

const memberRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync"],
  project_display_name: "Buni",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};

describe("leave_project MCP tool", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("requires confirm:true", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "leave_project",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(true);
    expect(result.text).toContain("confirm_required");
  });

  it("leaves active membership", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("SELECT")) {
        return [memberRow];
      }
      if (q.includes("UPDATE project_memberships")) {
        return [
          {
            ...memberRow,
            status: "revoked",
            revoked_at: "2026-10-02T12:00:00.000Z",
          },
        ];
      }
      if (q.includes("UPDATE project_membership_webhooks")) return [];
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "leave_project",
      args: { projectId: "proj-1", confirm: true },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(false);
    const body = JSON.parse(result.text) as {
      ok: boolean;
      status: string;
    };
    expect(body).toMatchObject({ ok: true, status: "revoked" });
  });

  it("rejects owner", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) {
        return [{ ...actorTokenRow, id: "owner-1" }];
      }
      if (q.includes("CREATE TABLE")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "leave_project",
      args: { projectId: "proj-1", confirm: true },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(true);
    expect(result.text).toContain("owner");
  });
});
