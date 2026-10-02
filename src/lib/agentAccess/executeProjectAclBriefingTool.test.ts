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

const activeMembershipRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: "NRG",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  project_display_name: "AgentWitch",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};

describe("get_project_briefing", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("denies non-member", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_memberships")) return [];
      return [];
    });
    const result = await executeAgentAccessTool({
      name: "get_project_briefing",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(true);
    expect(result.text).toContain("forbidden");
  });

  it("returns structured briefing for active member", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (
        q.includes("FROM project_memberships") &&
        q.includes("user_id") &&
        q.includes("status = 'active'") &&
        !q.includes("JOIN users")
      ) {
        return [activeMembershipRow];
      }
      if (q.includes("JOIN users") && q.includes("project_memberships")) {
        return [
          {
            project_display_name: "LeadBot",
            team_label: "Lead",
            email: "peer@agents.agentwitch.com",
          },
        ];
      }
      if (q.includes("FROM project_components")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "get_project_briefing",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBeFalsy();
    const body = JSON.parse(result.text) as {
      ok: boolean;
      projectId: string;
      projectName: string;
      caller: { projectDisplayName: string; teamLabel: string };
      peers: { projectDisplayName: string; teamLabel: string }[];
      howToDispatch: string;
      playbooks: { boundHarnessSetSlugs: string[]; note: string };
      briefingText: string;
    };
    expect(body.ok).toBe(true);
    expect(body.projectId).toBe("proj-1");
    expect(body.projectName).toBe("Demo");
    expect(body.caller.projectDisplayName).toBe("AgentWitch");
    expect(body.caller.teamLabel).toBe("NRG");
    expect(body.peers).toEqual([
      { projectDisplayName: "LeadBot", teamLabel: "Lead" },
    ]);
    expect(body.howToDispatch).toContain("project_dispatch");
    expect(body.howToDispatch).toContain("toProjectDisplayName");
    expect(body.playbooks.note).toBe("no playbooks bound");
    expect(body.briefingText).toContain("Demo");
    expect(body.briefingText).not.toContain("@");
  });

  it("get_my_project_access includes briefing when active", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (
        q.includes("FROM project_memberships") &&
        q.includes("status = 'active'") &&
        !q.includes("JOIN users")
      ) {
        return [activeMembershipRow];
      }
      if (q.includes("JOIN users")) return [];
      if (q.includes("FROM project_components")) return [];
      return [];
    });
    const result = await executeAgentAccessTool({
      name: "get_my_project_access",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBeFalsy();
    expect(result.text).toContain('"status":"active"');
    expect(result.text).toContain('"briefing"');
    expect(result.text).toContain("briefingText");
  });
});
