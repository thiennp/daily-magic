import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveAgentAccessRegisterUser } from "@/lib/agentAccess/resolveAgentAccessRegisterUser";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";

const sqlMock = vi.fn();
const createUserMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/auth/neonAdapter", () => ({
  createNeonAuthAdapter: () => ({
    createUser: createUserMock,
  }),
}));

describe("resolveAgentAccessRegisterUser", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    createUserMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("creates a user when the email is unused", async () => {
    sqlMock.mockResolvedValue([]);
    createUserMock.mockResolvedValue({ id: "user-new", email: "a@b.c" });

    const userId = await resolveAgentAccessRegisterUser({
      email: "agt-1@agents.agentwitch.com",
      displayName: "Scout",
    });

    expect(userId).toBe("user-new");
    expect(createUserMock).toHaveBeenCalledOnce();
  });

  it("rejects a human account that already exists", async () => {
    sqlMock.mockImplementation(async (query: TemplateStringsArray) =>
      String(query).includes("FROM users") ? [{ id: "human-1" }] : [],
    );

    const result = await resolveAgentAccessRegisterUser({
      email: "human@example.com",
      displayName: null,
    });

    expect(result).toMatchObject({ ok: false, code: "account_exists" });
    expect(createUserMock).not.toHaveBeenCalled();
  });

  it("recovers a synthetic user that was created without a token", async () => {
    sqlMock.mockImplementation(async (query: TemplateStringsArray) => {
      const text = String(query);

      if (text.includes("FROM users")) {
        return [{ id: "orphan-1" }];
      }

      if (text.includes("FROM agent_access_tokens")) {
        return [];
      }

      return [];
    });

    const userId = await resolveAgentAccessRegisterUser({
      email: "agt-orphan@agents.agentwitch.com",
      displayName: null,
    });

    expect(userId).toBe("orphan-1");
    expect(createUserMock).not.toHaveBeenCalled();
  });

  it("rejects a synthetic user that already has a token", async () => {
    sqlMock.mockImplementation(async (query: TemplateStringsArray) => {
      const text = String(query);

      if (text.includes("FROM users")) {
        return [{ id: "agent-1" }];
      }

      if (text.includes("FROM agent_access_tokens")) {
        return [{ id: "token-1" }];
      }

      return [];
    });

    const result = await resolveAgentAccessRegisterUser({
      email: "agt-1@agents.agentwitch.com",
      displayName: null,
    });

    expect(result).toMatchObject({ ok: false, code: "account_exists" });
  });
});
