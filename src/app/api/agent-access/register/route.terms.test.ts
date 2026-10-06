import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  AWC_TERMS_VERSION,
} from "@/lib/agentAccess/awcTermsVersion.constant";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentAccess/resolveAgentAccessRegisterUser", () => ({
  resolveAgentAccessRegisterUser: vi.fn(async () => "user-route-1"),
}));

vi.mock("@/lib/agentAccess/agentAccessRateLimit", () => ({
  countRecentAgentAccessAttempts: vi.fn(async () => 0),
  isAgentAccessRateLimited: () => false,
  isAgentAccessGloballyRateLimited: () => false,
  recordAgentAccessAttempt: vi.fn(async () => undefined),
}));

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: vi.fn(async () => null),
  agentAccessTooLargeResponse: () =>
    Response.json({ ok: false }, { status: 413 }),
}));

describe("POST /api/agent-access/register terms gate", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
    resetAgentAccessSchemaEnsureForTests();
  });

  it("missing terms → 400 with self-explaining message", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      new Request("https://www.agentwitch.com/api/agent-access/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ method: "none" }),
      }),
    );
    expect(res.status).toBe(400);
    const json = (await res.json()) as {
      ok: boolean;
      code: string;
      error: string;
    };
    expect(json.ok).toBe(false);
    expect(json.code).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_CODE);
    expect(json.error).toBe(AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR);
  });

  it("valid terms → 201", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      new Request("https://www.agentwitch.com/api/agent-access/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          method: "none",
          displayName: "Route Bot",
          acceptTerms: true,
          termsVersion: AWC_TERMS_VERSION,
        }),
      }),
    );
    expect(res.status).toBe(201);
    const json = (await res.json()) as { ok: boolean; token?: string };
    expect(json.ok).toBe(true);
    expect(typeof json.token).toBe("string");
  });
});
