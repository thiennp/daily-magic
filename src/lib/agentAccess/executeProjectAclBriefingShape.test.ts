import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import {
  briefingActiveMembershipRow,
  briefingActorTokenRow,
  briefingDemoProject,
  briefingSqlMock,
} from "@/lib/agentAccess/executeProjectAclBriefing.fixtures";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

vi.mock("@/lib/db", () => ({
  getSql: () => briefingSqlMock,
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
    projectId === "proj-1" ? briefingDemoProject : null,
  ),
}));

const mockActiveMemberSql = async (strings: TemplateStringsArray) => {
  const q = String(strings);
  if (q.includes("FROM agent_access_tokens")) return [briefingActorTokenRow];
  if (q.includes("CREATE TABLE")) return [];
  if (
    q.includes("FROM project_memberships") &&
    q.includes("status = 'active'") &&
    !q.includes("JOIN users")
  ) {
    return [briefingActiveMembershipRow];
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
};

describe("get_project_briefing shape", () => {
  beforeEach(() => {
    briefingSqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns structured briefing for active member", async () => {
    briefingSqlMock.mockImplementation(mockActiveMemberSql);
    const result = await executeAgentAccessTool({
      name: "get_project_briefing",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBeFalsy();
    const body = JSON.parse(result.text) as {
      ok: boolean;
      projectName: string;
      caller: { projectDisplayName: string; teamLabel: string };
      peers: { projectDisplayName: string; teamLabel: string }[];
      playbooks: { note: string };
      briefingText: string;
      howToDispatch: string;
    };
    expect(body.ok).toBe(true);
    expect(body.projectName).toBe("Demo");
    expect(body.caller).toEqual({
      projectDisplayName: "AgentWitch",
      teamLabel: "NRG",
    });
    expect(body.peers).toEqual([
      { projectDisplayName: "LeadBot", teamLabel: "Lead" },
    ]);
    expect(body.howToDispatch).toContain("toProjectDisplayName");
    expect(body.playbooks.note).toBe("no playbooks bound");
    expect(body.briefingText).toContain("Demo");
    expect(body.briefingText).not.toContain("@");
  });

  it("get_my_project_access includes briefing when active", async () => {
    briefingSqlMock.mockImplementation(mockActiveMemberSql);
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
