import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetMacBootstrapSchemaEnsureForTests } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { exchangeMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode";
import {
  EXCHANGE_TEST_CODE,
  EXCHANGE_TEST_CODE_HASH,
  EXCHANGE_TEST_NOW,
  EXCHANGE_TEST_VERIFIER,
  isMacBootstrapSchemaSql,
  pendingBootstrapRow,
} from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode.testUtils";
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

describe("exchangeMacBootstrapCode success", () => {
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
      if (isMacBootstrapSchemaSql(q)) return [];
      if (q.includes("SELECT user_id, state, code_challenge")) {
        return [pendingBootstrapRow({})];
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
      code: EXCHANGE_TEST_CODE,
      state: "st-1",
      codeVerifier: EXCHANGE_TEST_VERIFIER,
      nowMs: EXCHANGE_TEST_NOW,
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
    expect(EXCHANGE_TEST_CODE_HASH).toHaveLength(64);
  });
});
