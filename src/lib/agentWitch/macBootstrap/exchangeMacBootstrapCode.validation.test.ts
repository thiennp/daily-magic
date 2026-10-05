import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetMacBootstrapSchemaEnsureForTests } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { exchangeMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode";
import {
  EXCHANGE_TEST_CODE,
  EXCHANGE_TEST_NOW,
  EXCHANGE_TEST_PAST,
  EXCHANGE_TEST_VERIFIER,
  isMacBootstrapSchemaSql,
  pendingBootstrapRow,
  sqlMockDidBurn,
} from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode.testUtils";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentWitch/createAgentWitchInstallTokenForUser", () => ({
  createAgentWitchInstallTokenForUser: vi.fn(),
}));

vi.mock("@/lib/agentWitch/macBootstrap/computeMacBootstrapScriptSha256", () => ({
  computeMacBootstrapScriptSha256: () => "a".repeat(64),
}));

const mockPending = (row: Record<string, unknown> | null): void => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (isMacBootstrapSchemaSql(q)) return [];
    if (q.includes("SELECT user_id, state, code_challenge")) {
      return row === null ? [] : [row];
    }
    return [];
  });
};

describe("exchangeMacBootstrapCode validation", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetMacBootstrapSchemaEnsureForTests();
  });

  it("rejects unknown code without burning", async () => {
    mockPending(null);
    const result = await exchangeMacBootstrapCode({
      code: EXCHANGE_TEST_CODE,
      state: "st-1",
      codeVerifier: EXCHANGE_TEST_VERIFIER,
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({ ok: false, status: 400, error: "invalid_code" });
    expect(sqlMockDidBurn(sqlMock)).toBe(false);
  });

  it("rejects state mismatch and burns the found code", async () => {
    mockPending(pendingBootstrapRow({ state: "expected-state" }));
    const result = await exchangeMacBootstrapCode({
      code: EXCHANGE_TEST_CODE,
      state: "wrong-state",
      codeVerifier: EXCHANGE_TEST_VERIFIER,
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "state_mismatch",
    });
    expect(sqlMockDidBurn(sqlMock)).toBe(true);
  });

  it("rejects bad verifier and burns the found code", async () => {
    mockPending(pendingBootstrapRow({}));
    const result = await exchangeMacBootstrapCode({
      code: EXCHANGE_TEST_CODE,
      state: "st-1",
      codeVerifier: "not-the-matching-verifier-value________",
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "bad_verifier",
    });
    expect(sqlMockDidBurn(sqlMock)).toBe(true);
  });

  it("rejects expired codes with 410", async () => {
    mockPending(pendingBootstrapRow({ expiresAt: EXCHANGE_TEST_PAST }));
    const result = await exchangeMacBootstrapCode({
      code: EXCHANGE_TEST_CODE,
      state: "st-1",
      codeVerifier: EXCHANGE_TEST_VERIFIER,
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({ ok: false, status: 410, error: "expired" });
  });

  it("rejects reused codes with 410", async () => {
    mockPending(pendingBootstrapRow({ consumedAt: EXCHANGE_TEST_PAST }));
    const result = await exchangeMacBootstrapCode({
      code: EXCHANGE_TEST_CODE,
      state: "st-1",
      codeVerifier: EXCHANGE_TEST_VERIFIER,
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({ ok: false, status: 410, error: "reused" });
  });
});
