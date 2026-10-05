import { beforeEach, describe, expect, it, vi } from "vitest";

import { computePkceS256Challenge } from "@/lib/agentWitch/macBootstrap/computePkceS256Challenge";
import { resetMacBootstrapSchemaEnsureForTests } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { exchangeMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode";
import { hashMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/hashMacBootstrapCode";
import { MAC_BOOTSTRAP_SCRIPT_URL } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";

const sqlMock = vi.fn();
const createInstallToken = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentWitch/createAgentWitchInstallTokenForUser", () => ({
  createAgentWitchInstallTokenForUser: (...args: readonly unknown[]) =>
    createInstallToken(...args),
}));

vi.mock("@/lib/agentWitch/macBootstrap/computeMacBootstrapScriptSha256", () => ({
  computeMacBootstrapScriptSha256: () => "a".repeat(64),
}));

const CODE = "bootstrap-code-plaintext";
const CODE_HASH = hashMacBootstrapCode(CODE);
const VERIFIER = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
const CHALLENGE = computePkceS256Challenge(VERIFIER);
const NOW = 1_700_000_000_000;
const FUTURE = new Date(NOW + 60_000).toISOString();
const PAST = new Date(NOW - 60_000).toISOString();

const isSchemaSql = (q: string): boolean =>
  q.includes("CREATE TABLE") || q.includes("CREATE INDEX");

describe("exchangeMacBootstrapCode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    createInstallToken.mockReset();
    resetMacBootstrapSchemaEnsureForTests();
    createInstallToken.mockResolvedValue({
      pairingToken: "b".repeat(64),
      tokenHash: "c".repeat(64),
      installCommand: "curl …",
    });
  });

  it("returns installToken on valid unused code", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [
          {
            user_id: "user-1",
            state: "st-1",
            code_challenge: CHALLENGE,
            expires_at: FUTURE,
            consumed_at: null,
          },
        ];
      }
      if (q.includes("SET consumed_at")) {
        return [{ user_id: "user-1" }];
      }
      if (q.includes("SELECT email FROM users")) {
        return [{ email: "Owner@AgentWitch.com" }];
      }
      return [];
    });

    const result = await exchangeMacBootstrapCode({
      code: CODE,
      state: "st-1",
      codeVerifier: VERIFIER,
      nowMs: NOW,
    });

    expect(result).toEqual({
      ok: true,
      installToken: "b".repeat(64),
      profileEmail: "owner@agentwitch.com",
      scriptUrl: MAC_BOOTSTRAP_SCRIPT_URL,
      scriptSha256: "a".repeat(64),
    });
    expect(createInstallToken).toHaveBeenCalledWith({
      userId: "user-1",
      email: "owner@agentwitch.com",
      origin: "https://www.agentwitch.com",
    });
    expect(CODE_HASH).toHaveLength(64);
  });

  it("rejects state mismatch without burning", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [
          {
            user_id: "user-1",
            state: "expected-state",
            code_challenge: CHALLENGE,
            expires_at: FUTURE,
            consumed_at: null,
          },
        ];
      }
      return [];
    });

    const result = await exchangeMacBootstrapCode({
      code: CODE,
      state: "wrong-state",
      codeVerifier: VERIFIER,
      nowMs: NOW,
    });

    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "state_mismatch",
    });
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("SET consumed_at"),
      ),
    ).toBe(false);
  });

  it("rejects bad verifier without burning", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [
          {
            user_id: "user-1",
            state: "st-1",
            code_challenge: CHALLENGE,
            expires_at: FUTURE,
            consumed_at: null,
          },
        ];
      }
      return [];
    });

    const result = await exchangeMacBootstrapCode({
      code: CODE,
      state: "st-1",
      codeVerifier: "not-the-matching-verifier-value________",
      nowMs: NOW,
    });

    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "bad_verifier",
    });
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("SET consumed_at"),
      ),
    ).toBe(false);
  });

  it("rejects expired codes with 410", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [
          {
            user_id: "user-1",
            state: "st-1",
            code_challenge: CHALLENGE,
            expires_at: PAST,
            consumed_at: null,
          },
        ];
      }
      return [];
    });

    const result = await exchangeMacBootstrapCode({
      code: CODE,
      state: "st-1",
      codeVerifier: VERIFIER,
      nowMs: NOW,
    });

    expect(result).toEqual({
      ok: false,
      status: 410,
      error: "expired",
    });
  });

  it("rejects reused codes with 410", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [
          {
            user_id: "user-1",
            state: "st-1",
            code_challenge: CHALLENGE,
            expires_at: FUTURE,
            consumed_at: PAST,
          },
        ];
      }
      return [];
    });

    const result = await exchangeMacBootstrapCode({
      code: CODE,
      state: "st-1",
      codeVerifier: VERIFIER,
      nowMs: NOW,
    });

    expect(result).toEqual({
      ok: false,
      status: 410,
      error: "reused",
    });
  });
});
