import { describe, expect, it } from "vitest";

import {
  CLAIM_BOT_ENTRY_FAIL_LIMIT,
  CLAIM_BOT_ENTRY_WINDOW_MS,
} from "@/lib/agentAccess/claimBot/claimBot.constants";
import {
  decideClaimEntryAfterFailure,
  decideClaimEntryLock,
} from "@/lib/agentAccess/claimBot/decideClaimEntryLock";

describe("decideClaimEntryLock", () => {
  const nowMs = 1_700_000_000_000;

  it("stays open below the fail limit with no active lock", () => {
    expect(
      decideClaimEntryLock({
        nowMs,
        lockedUntilMs: null,
        failureCountInWindow: CLAIM_BOT_ENTRY_FAIL_LIMIT - 1,
      }),
    ).toEqual({ status: "open" });
  });

  it("locks when failure count hits the limit (boundary)", () => {
    expect(
      decideClaimEntryLock({
        nowMs,
        lockedUntilMs: null,
        failureCountInWindow: CLAIM_BOT_ENTRY_FAIL_LIMIT,
      }),
    ).toEqual({
      status: "locked",
      retryAt: new Date(nowMs + CLAIM_BOT_ENTRY_WINDOW_MS),
    });
  });

  it("honors an active lock until lockedUntil, then opens", () => {
    expect(
      decideClaimEntryLock({
        nowMs,
        lockedUntilMs: nowMs + 60_000,
        failureCountInWindow: 0,
      }),
    ).toEqual({ status: "locked", retryAt: new Date(nowMs + 60_000) });
    expect(
      decideClaimEntryLock({
        nowMs,
        lockedUntilMs: nowMs,
        failureCountInWindow: 0,
      }),
    ).toEqual({ status: "open" });
  });

  it("decideClaimEntryAfterFailure locks exactly on the 5th fail", () => {
    expect(
      decideClaimEntryAfterFailure({
        previousFailureCountInWindow: CLAIM_BOT_ENTRY_FAIL_LIMIT - 2,
        nowMs,
      }),
    ).toEqual({ status: "open" });
    expect(
      decideClaimEntryAfterFailure({
        previousFailureCountInWindow: CLAIM_BOT_ENTRY_FAIL_LIMIT - 1,
        nowMs,
      }),
    ).toEqual({
      status: "locked",
      retryAt: new Date(nowMs + CLAIM_BOT_ENTRY_WINDOW_MS),
    });
  });
});
