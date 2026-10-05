export type HumanMembershipState = "none" | "active" | "removed";
export type HumanMembershipEvent = "accept" | "remove";

const TRANSITIONS: Readonly<
  Record<
    HumanMembershipState,
    Readonly<Partial<Record<HumanMembershipEvent, HumanMembershipState>>>
  >
> = {
  none: { accept: "active" },
  active: { remove: "removed" },
  removed: {},
};

/**
 * Pure human-membership FSA. none → active → removed.
 * No active → active transfer; removed is terminal for that seat row.
 */
export const decideHumanMembershipTransition = (input: {
  readonly from: HumanMembershipState;
  readonly event: HumanMembershipEvent;
}): HumanMembershipState | null =>
  TRANSITIONS[input.from][input.event] ?? null;
