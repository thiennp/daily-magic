import { describe, expect, it } from "vitest";

import { resolveDispatchApprovalExpiry } from "@/features/dispatch/utils/resolveDispatchApprovalExpiry";

const NOW = Date.parse("2026-10-06T14:00:00.000Z");
const at = (ms: number): string => new Date(NOW + ms).toISOString();

describe("resolveDispatchApprovalExpiry (S0 approval card)", () => {
  it("shows minutes left, rounded up", () => {
    expect(
      resolveDispatchApprovalExpiry({
        approvalExpiresAt: at(15 * 60_000),
        requester: "sam@example.com",
        nowMs: NOW,
      }),
    ).toEqual({
      kind: "open",
      line: "Nothing runs unless you approve. This request ends in 15 min.",
    });
    expect(
      resolveDispatchApprovalExpiry({
        approvalExpiresAt: at(30_000),
        requester: "sam@example.com",
        nowMs: NOW,
      }),
    ).toMatchObject({ line: expect.stringContaining("ends in 1 min.") });
  });

  it("shows the ended lines once time is up", () => {
    expect(
      resolveDispatchApprovalExpiry({
        approvalExpiresAt: at(0),
        requester: "sam@example.com",
        nowMs: NOW,
      }),
    ).toEqual({
      kind: "ended",
      title: "This request ended",
      body: "Nothing ran. sam@example.com can send the task again.",
    });
  });

  it("shows nothing without a valid expiry", () => {
    for (const approvalExpiresAt of [null, "not a date"]) {
      expect(
        resolveDispatchApprovalExpiry({
          approvalExpiresAt,
          requester: "x",
          nowMs: NOW,
        }),
      ).toEqual({ kind: "none" });
    }
  });
});
