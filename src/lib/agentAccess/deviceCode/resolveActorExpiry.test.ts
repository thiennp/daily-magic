import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resolveAgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("resolveAgentAccessActor expiry/revoke", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("revoked token rejected", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE") || q.includes("CREATE INDEX")) {
        return [];
      }
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "u1",
            email: "a@agents.agentwitch.com",
            name: "A",
            image: null,
            global_role: "user",
            registration_method: "none",
            expires_at: null,
            revoked_at: "2026-10-01T00:00:00.000Z",
          },
        ];
      }
      return [];
    });
    const actor = await resolveAgentAccessActor("aw_some_token_value_here");
    expect(actor).toBeNull();
  });

  it("expired token rejected", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE") || q.includes("CREATE INDEX")) {
        return [];
      }
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "u1",
            email: "a@agents.agentwitch.com",
            name: "A",
            image: null,
            global_role: "user",
            registration_method: "none",
            expires_at: "2020-01-01T00:00:00.000Z",
            revoked_at: null,
          },
        ];
      }
      return [];
    });
    const actor = await resolveAgentAccessActor("aw_some_token_value_here");
    expect(actor).toBeNull();
  });

  it("existing tokens without expires_at still resolve", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE") || q.includes("CREATE INDEX")) {
        return [];
      }
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "u1",
            email: "a@agents.agentwitch.com",
            name: "Legacy",
            image: null,
            global_role: "user",
            registration_method: "none",
            expires_at: null,
            revoked_at: null,
          },
        ];
      }
      if (q.includes("SET last_used_at")) {
        return [];
      }
      return [];
    });
    const actor = await resolveAgentAccessActor("aw_legacy_token_value____");
    expect(actor?.id).toBe("u1");
    expect(actor?.name).toBe("Legacy");
  });
});
