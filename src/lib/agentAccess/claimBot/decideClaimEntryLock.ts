import {
  CLAIM_BOT_ENTRY_FAIL_LIMIT,
  CLAIM_BOT_ENTRY_WINDOW_MS,
} from "@/lib/agentAccess/claimBot/claimBot.constants";

export type ClaimEntryState = "open" | "locked";

export type ClaimEntryDecision =
  | { readonly status: "open" }
  | { readonly status: "locked"; readonly retryAt: Date };

/**
 * Pure entry lock FSA: open ⇄ locked.
 * Locked after CLAIM_BOT_ENTRY_FAIL_LIMIT fails in the window, for the window
 * duration from lockedUntil (set when the limit is hit).
 */
export const decideClaimEntryLock = (input: {
  readonly nowMs: number;
  readonly lockedUntilMs: number | null;
  readonly failureCountInWindow: number;
}): ClaimEntryDecision => {
  if (
    input.lockedUntilMs !== null &&
    input.lockedUntilMs > input.nowMs
  ) {
    return { status: "locked", retryAt: new Date(input.lockedUntilMs) };
  }
  if (input.failureCountInWindow >= CLAIM_BOT_ENTRY_FAIL_LIMIT) {
    return {
      status: "locked",
      retryAt: new Date(input.nowMs + CLAIM_BOT_ENTRY_WINDOW_MS),
    };
  }
  return { status: "open" };
};

/** After a failed entry while open: should we engage the lock? */
export const decideClaimEntryAfterFailure = (input: {
  readonly previousFailureCountInWindow: number;
  readonly nowMs: number;
}): ClaimEntryDecision =>
  decideClaimEntryLock({
    nowMs: input.nowMs,
    lockedUntilMs: null,
    failureCountInWindow: input.previousFailureCountInWindow + 1,
  });
