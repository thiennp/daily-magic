export type ClaimCodeState =
  | "issued"
  | "redeemed"
  | "expired"
  | "superseded"
  | "revoked";

export type ClaimCodeEvent = "redeem" | "expire" | "supersede" | "revoke";

/** Terminal states: no further transitions. */
export const CLAIM_CODE_TERMINAL_STATES: readonly ClaimCodeState[] = [
  "redeemed",
  "expired",
  "superseded",
  "revoked",
] as const;

const TRANSITIONS: Readonly<
  Record<ClaimCodeState, Readonly<Partial<Record<ClaimCodeEvent, ClaimCodeState>>>>
> = {
  issued: {
    redeem: "redeemed",
    expire: "expired",
    supersede: "superseded",
    revoke: "revoked",
  },
  redeemed: {},
  expired: {},
  superseded: {},
  revoked: {},
};

/**
 * Pure claim-code FSA. issued → redeemed | expired | superseded | revoked.
 * All terminal states are final.
 */
export const decideClaimCodeTransition = (input: {
  readonly from: ClaimCodeState;
  readonly event: ClaimCodeEvent;
}): ClaimCodeState | null => TRANSITIONS[input.from][input.event] ?? null;

export const isClaimCodeTerminal = (state: ClaimCodeState): boolean =>
  CLAIM_CODE_TERMINAL_STATES.includes(state);
