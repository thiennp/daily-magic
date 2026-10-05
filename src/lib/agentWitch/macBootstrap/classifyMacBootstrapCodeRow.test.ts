import { describe, expect, it } from "vitest";

import { classifyMacBootstrapCodeRow } from "@/lib/agentWitch/macBootstrap/classifyMacBootstrapCodeRow";
import {
  EXCHANGE_TEST_CHALLENGE,
  EXCHANGE_TEST_NOW,
  EXCHANGE_TEST_PAST,
  pendingBootstrapRow,
} from "@/lib/agentWitch/macBootstrap/exchangeMacBootstrapCode.testUtils";

const classify = (row: Record<string, unknown> | undefined, state = "st-1") =>
  classifyMacBootstrapCodeRow({ row, state, nowMs: EXCHANGE_TEST_NOW });

describe("classifyMacBootstrapCodeRow", () => {
  it("returns pending for a live matching row", () => {
    expect(classify(pendingBootstrapRow({}))).toEqual({
      ok: true,
      pending: { userId: "user-1", codeChallenge: EXCHANGE_TEST_CHALLENGE },
    });
  });

  it("absent row → invalid_code", () => {
    expect(classify(undefined)).toEqual({
      ok: false,
      status: 400,
      error: "invalid_code",
    });
  });

  it("consumed (string or Date) → reused", () => {
    expect(
      classify(pendingBootstrapRow({ consumedAt: EXCHANGE_TEST_PAST })),
    ).toMatchObject({ error: "reused", status: 410 });
    expect(
      classify({
        ...pendingBootstrapRow({}),
        consumed_at: new Date(EXCHANGE_TEST_PAST),
      }),
    ).toMatchObject({ error: "reused" });
  });

  it("expired (string, Date, or unparseable) → expired", () => {
    expect(
      classify(pendingBootstrapRow({ expiresAt: EXCHANGE_TEST_PAST })),
    ).toMatchObject({ error: "expired", status: 410 });
    expect(
      classify({
        ...pendingBootstrapRow({}),
        expires_at: new Date(EXCHANGE_TEST_PAST),
      }),
    ).toMatchObject({ error: "expired" });
    expect(
      classify({ ...pendingBootstrapRow({}), expires_at: null }),
    ).toMatchObject({ error: "expired" });
  });

  it("Date expiry in the future is live", () => {
    const row = {
      ...pendingBootstrapRow({}),
      expires_at: new Date(EXCHANGE_TEST_NOW + 60_000),
    };
    expect(classify(row)).toMatchObject({ ok: true });
  });

  it("wrong or non-string state → state_mismatch", () => {
    expect(classify(pendingBootstrapRow({ state: "other" }))).toMatchObject({
      error: "state_mismatch",
      status: 400,
    });
    expect(classify({ ...pendingBootstrapRow({}), state: null })).toMatchObject(
      { error: "state_mismatch" },
    );
    expect(classify({ ...pendingBootstrapRow({}), state: 42 })).toMatchObject({
      error: "state_mismatch",
    });
  });

  it("missing user_id or code_challenge → invalid_code", () => {
    expect(classify({ ...pendingBootstrapRow({}), user_id: "" })).toMatchObject(
      { error: "invalid_code" },
    );
    expect(
      classify({ ...pendingBootstrapRow({}), code_challenge: null }),
    ).toMatchObject({ error: "invalid_code" });
  });
});
