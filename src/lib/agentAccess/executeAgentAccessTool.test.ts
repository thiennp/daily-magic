import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentAccess/resolveAgentAccessRegisterUser", () => ({
  resolveAgentAccessRegisterUser: vi.fn(async () => "user-1"),
}));

vi.mock("@/lib/agentWitch/listAgentWitchDevicesForUser", () => ({
  listAgentWitchDevicesForUser: vi.fn(async () => [
    {
      id: "mac-1",
      userId: "user-1",
      deviceLabel: "studio",
      displayName: "Studio Mac",
      dispatchPolicy: null,
      claimedAt: "2026-09-24T00:00:00.000Z",
      lastSeenAt: null,
      revokedAt: null,
    },
  ]),
}));

vi.mock("@/lib/dispatch/listAgentRunsForUser", () => ({
  listAgentRunsForUser: vi.fn(async () => []),
}));

vi.mock("@/lib/dispatch/getAgentRunForParticipant", () => ({
  getAgentRunForParticipant: vi.fn(async () => null),
}));

vi.mock("@/lib/dispatch/dispatchWriterRunForDashboardUser", () => ({
  dispatchClaudeRunForDashboardUser: vi.fn(async () => ({
    ok: false,
    message: { type: "system.error", payload: { errorMessage: "No Mac." } },
  })),
}));

describe("executeAgentAccessTool", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
    resetAgentAccessSchemaEnsureForTests();
  });

  it("rejects a registration body without a method", async () => {
    const result = await executeAgentAccessTool({
      name: "register_account",
      args: {},
      authorization: null,
      ip: "127.0.0.1",
    });

    expect(result.isError).toBe(true);
    expect(result.text).toContain("invalid_arguments");
  });

  it("requires a bearer token for account tools", async () => {
    const result = await executeAgentAccessTool({
      name: "whoami",
      args: {},
      authorization: null,
      ip: "127.0.0.1",
    });

    expect(result.text).toContain("unauthorized");
  });

  it("returns not found and unknown tool results", async () => {
    sqlMock.mockImplementation(async (query: TemplateStringsArray) =>
      String(query).includes("FROM agent_access_tokens")
        ? [
            {
              id: "user-1",
              email: "agt@agents.agentwitch.com",
              name: "Scout",
              global_role: "user",
              registration_method: "none",
            },
          ]
        : [],
    );

    const missing = await executeAgentAccessTool({
      name: "get_run",
      args: { runId: "run-1" },
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });
    const unknown = await executeAgentAccessTool({
      name: "missing_tool",
      args: {},
      authorization: "Bearer aw_testtokenvalue000000000",
      ip: "127.0.0.1",
    });

    expect(missing.text).toContain("not_found");
    expect(unknown.text).toContain("unknown_tool");
  });
});
