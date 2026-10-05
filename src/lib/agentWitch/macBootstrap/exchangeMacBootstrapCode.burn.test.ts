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
} from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode.testUtils";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentWitch/createAgentWitchInstallTokenForUser", () => ({
  createAgentWitchInstallTokenForUser: vi.fn(),
}));

const burnCalls = (): number =>
  sqlMock.mock.calls.filter((call) =>
    String(call[0]).includes("SET consumed_at"),
  ).length;

const mockRows = (rows: readonly Record<string, unknown>[]): void => {
  const queue = [...rows];
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (isMacBootstrapSchemaSql(q)) return [];
    if (q.includes("SELECT user_id, state, code_challenge")) {
      const next = queue.length > 1 ? queue.shift() : queue[0];
      return next === undefined ? [] : [next];
    }
    return [];
  });
};

const exchange = (state = "st-1") =>
  exchangeMacBootstrapCode({
    code: EXCHANGE_TEST_CODE,
    state,
    codeVerifier: EXCHANGE_TEST_VERIFIER,
    nowMs: EXCHANGE_TEST_NOW,
  });

describe("exchangeMacBootstrapCode burn ownership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetMacBootstrapSchemaEnsureForTests();
  });

  it("burns once on non-string state (state_mismatch)", async () => {
    mockRows([{ ...pendingBootstrapRow({}), state: null }]);
    expect(await exchange()).toEqual({
      ok: false,
      status: 400,
      error: "state_mismatch",
    });
    expect(burnCalls()).toBe(1);
  });

  it("burns once on missing user_id", async () => {
    mockRows([{ ...pendingBootstrapRow({}), user_id: null }]);
    expect(await exchange()).toEqual({
      ok: false,
      status: 400,
      error: "invalid_code",
    });
    expect(burnCalls()).toBe(1);
  });

  it("burns once on state mismatch", async () => {
    mockRows([pendingBootstrapRow({ state: "expected" })]);
    await exchange("wrong");
    expect(burnCalls()).toBe(1);
  });

  it("lost atomic consume race reclassifies as reused", async () => {
    mockRows([
      pendingBootstrapRow({}),
      pendingBootstrapRow({ consumedAt: EXCHANGE_TEST_PAST }),
    ]);
    expect(await exchange()).toEqual({
      ok: false,
      status: 410,
      error: "reused",
    });
  });
});
