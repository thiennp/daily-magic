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

  it("lists allowlisted activity for the project owner bot", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("FROM agent_access_tokens")) return [ownerTokenRow];
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_access_audit")) {
        return [
          {
            id: "evt-1",
            project_id: "proj-1",
            actor_user_id: "owner-1",
            action: "allow_claim_ok",
            target_user_id: "owner-1",
            at: "2026-10-01T03:00:00.000Z",
            detail: { outcome: "ok", allowClaim: "secret" },
          },
        ];
      }
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
      events: readonly { action: string; detail: Record<string, unknown> }[];
    };
    expect(body.ok).toBe(true);
    expect(body.events[0].action).toBe("allow_claim_ok");
    expect(body.events[0].detail).toEqual({ outcome: "ok" });
  });
});
