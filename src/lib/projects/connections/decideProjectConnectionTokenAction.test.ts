import { describe, expect, it } from "vitest";

import { decideProjectConnectionTokenAction } from "@/lib/projects/connections/decideProjectConnectionTokenAction";

const NOW = Date.parse("2026-10-09T12:00:00Z");

describe("decideProjectConnectionTokenAction", () => {
  it("never uses a connection that is not connected", () => {
    for (const status of ["expired", "revoked", "error", "connecting"]) {
      expect(
        decideProjectConnectionTokenAction({
          status,
          tokenExpiresAt: null,
          nowMs: NOW,
        }),
      ).toBe("unusable");
    }
  });

  it("uses tokens without an expiry and tokens that are still fresh", () => {
    expect(
      decideProjectConnectionTokenAction({
        status: "connected",
        tokenExpiresAt: null,
        nowMs: NOW,
      }),
    ).toBe("use");
    expect(
      decideProjectConnectionTokenAction({
        status: "connected",
        tokenExpiresAt: new Date(NOW + 10 * 60_000),
        nowMs: NOW,
      }),
    ).toBe("use");
  });

  it("refreshes a token that expires within a minute or already expired", () => {
    expect(
      decideProjectConnectionTokenAction({
        status: "connected",
        tokenExpiresAt: new Date(NOW + 30_000),
        nowMs: NOW,
      }),
    ).toBe("refresh");
    expect(
      decideProjectConnectionTokenAction({
        status: "connected",
        tokenExpiresAt: new Date(NOW - 1),
        nowMs: NOW,
      }),
    ).toBe("refresh");
  });
});
