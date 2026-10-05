import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  EXCHANGE_TEST_CODE_HASH,
  EXCHANGE_TEST_NOW,
  pendingBootstrapRow,
  sqlMockDidBurn,
} from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode.testUtils";
import { loadPendingMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/loadPendingMacBootstrapCode";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("loadPendingMacBootstrapCode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("classifies a state mismatch without burning", async () => {
    sqlMock.mockResolvedValue([pendingBootstrapRow({ state: "expected" })]);
    const result = await loadPendingMacBootstrapCode({
      codeHash: EXCHANGE_TEST_CODE_HASH,
      state: "wrong",
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result).toEqual({
      rowFound: true,
      classified: { ok: false, status: 400, error: "state_mismatch" },
    });
    expect(sqlMockDidBurn(sqlMock)).toBe(false);
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("reports rowFound false for unknown hash", async () => {
    sqlMock.mockResolvedValue([]);
    const result = await loadPendingMacBootstrapCode({
      codeHash: EXCHANGE_TEST_CODE_HASH,
      state: "st-1",
      nowMs: EXCHANGE_TEST_NOW,
    });
    expect(result.rowFound).toBe(false);
    expect(result.classified).toEqual({
      ok: false,
      status: 400,
      error: "invalid_code",
    });
  });
});
