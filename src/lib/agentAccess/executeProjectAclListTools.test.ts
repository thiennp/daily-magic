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

describe("agent-access project ACL list/status tools", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("list_projects and get_my_project_access", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [actorTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM user_projects") && q.includes("owner_user_id")) {
        return [{ id: "proj-1", name: "Demo" }];
      }
      if (q.includes("FROM project_memberships")) return [];
      if (q.includes("FROM project_access_requests")) return [];
      return [];
    });

    const listed = await executeAgentAccessTool({
      name: "list_projects",
      args: {},
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(listed.isError).toBeFalsy();
    expect(listed.text).toContain("ok");

    const status = await executeAgentAccessTool({
      name: "get_my_project_access",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(status.text).toContain('"status":"none"');
  });
});
