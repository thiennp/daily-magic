export type BotOwnershipState = "unclaimed" | "claimed";

export type BotOwnershipEvent = "claim" | "unclaim";

const TRANSITIONS: Readonly<
  Record<
    BotOwnershipState,
    Readonly<Partial<Record<BotOwnershipEvent, BotOwnershipState>>>
  >
> = {
  unclaimed: { claim: "claimed" },
  claimed: { unclaim: "unclaimed" },
};

/**
 * Pure ownership FSA. unclaimed ⇄ claimed. No claimed → claimed transfer.
 */
export const decideOwnershipTransition = (input: {
  readonly from: BotOwnershipState;
  readonly event: BotOwnershipEvent;
}): BotOwnershipState | null => TRANSITIONS[input.from][input.event] ?? null;
