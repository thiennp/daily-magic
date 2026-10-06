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

const ownerTokenRow = {
  id: "owner-1",
  email: "owner@agents.agentwitch.com",
  name: "Owner",
  global_role: "user",
  registration_method: "none",
};

describe("agent-access list_project_activity", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
    resetProjectAclSchemaEnsureForTests();
  });

  it("returns owner_only for a member bot (not the project owner)", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [{ ...ownerTokenRow, id: "bot-1" }];
      return [];
    });
    const result = await executeAgentAccessTool({
      name: "list_project_activity",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBe(true);
    expect(JSON.parse(result.text)).toMatchObject({ ok: false, code: "owner_only" });
  });

  it("returns the (empty) Access log for the project owner bot", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [ownerTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      return [];
    });

    const result = await executeAgentAccessTool({
      name: "list_project_activity",
      args: { projectId: "proj-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    expect(result.isError).toBeFalsy();
    const body = JSON.parse(result.text) as {
      ok: boolean;
      events: readonly unknown[];
      nextCursor: string | null;
    };
    expect(body.ok).toBe(true);
    expect(body.events).toEqual([]);
    expect(body.nextCursor ?? null).toBeNull();
    expect(body).toMatchObject({ retention: { maxEvents: 500, maxAgeDays: 180 } });
  });
});
