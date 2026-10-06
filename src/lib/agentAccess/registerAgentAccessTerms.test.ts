import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  AWC_TERMS_VERSION,
} from "@/lib/agentAccess/awcTermsVersion.constant";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { executeAgentAccessRegisterTool } from "@/lib/agentAccess/executeAgentAccessRegisterTool";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";

const sqlMock = vi.fn();
const insertCalls: string[] = [];

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentAccess/resolveAgentAccessRegisterUser", () => ({
  resolveAgentAccessRegisterUser: vi.fn(async () => "user-terms-1"),
}));

vi.mock("@/lib/agentAccess/agentAccessRateLimit", () => ({
  countRecentAgentAccessAttempts: vi.fn(async () => 0),
  isAgentAccessRateLimited: () => false,
  isAgentAccessGloballyRateLimited: () => false,
  recordAgentAccessAttempt: vi.fn(async () => undefined),
}));

describe("agent-access register terms gate", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    insertCalls.length = 0;
    resetAgentAccessSchemaEnsureForTests();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("INSERT INTO agent_access_tokens")) {
        insertCalls.push(q);
      }
      return [];
    });
  });

  it("MCP register_account missing terms → terms_acceptance_required", async () => {
    const result = await executeAgentAccessRegisterTool(
      { method: "none" },
      "127.0.0.1",
    );
    expect(result.isError).toBe(true);
    const payload = JSON.parse(result.text) as {
      code: string;
      error: string;
    };
    expect(payload.code).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_CODE);
    expect(payload.error).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR);
    expect(insertCalls).toHaveLength(0);
  });

  it("MCP register_account acceptTerms false → terms_acceptance_required", async () => {
    const result = await executeAgentAccessRegisterTool(
      {
        method: "none",
        acceptTerms: false,
        termsVersion: AWC_TERMS_VERSION,
      },
      "127.0.0.1",
    );
    expect(result.isError).toBe(true);
    expect(result.text).toContain(AWC_TERMS_ACCEPTANCE_REQUIRED_CODE);
    expect(insertCalls).toHaveLength(0);
  });

  it("MCP register_account stale termsVersion → terms_acceptance_required", async () => {
    const result = await executeAgentAccessRegisterTool(
      {
        method: "none",
        acceptTerms: true,
        termsVersion: "1999-01-01",
      },
      "127.0.0.1",
    );
    expect(result.isError).toBe(true);
    expect(result.text).toContain(AWC_TERMS_ACCEPTANCE_REQUIRED_CODE);
    expect(insertCalls).toHaveLength(0);
  });

  it("valid terms → registers and records terms_version", async () => {
    const outcome = await registerAgentAccessAccount({
      body: {
        method: "none",
        displayName: "Terms Bot",
        acceptTerms: true,
        termsVersion: AWC_TERMS_VERSION,
      },
      ipHash: "ip-hash-test",
    });
    expect(outcome.ok).toBe(true);
    expect(insertCalls).toHaveLength(1);
    expect(insertCalls[0]).toContain("terms_version");
    expect(insertCalls[0]).toContain("terms_accepted_at");
  });

  it("existing token resolve path does not require terms columns", async () => {
    const { resolveAgentAccessActor } = await import(
      "@/lib/agentAccess/resolveAgentAccessActor"
    );
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String.raw({ raw: strings });
      if (q.includes("FROM agent_access_tokens")) {
        return [
          {
            id: "user-legacy",
            email: "agt-legacy@agents.agentwitch.com",
            name: "Legacy",
            image: null,
            global_role: "user",
            registration_method: "none",
            // terms_version / terms_accepted_at intentionally absent (nullable legacy)
          },
        ];
      }
      return [];
    });
    const actor = await resolveAgentAccessActor(
      "aw_testtokenvalue00000000000001",
    );
    expect(actor?.id).toBe("user-legacy");
    expect(actor?.registrationMethod).toBe("none");
  });
});
