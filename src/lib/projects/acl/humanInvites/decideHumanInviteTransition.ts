export type HumanInviteState = "pending" | "accepted" | "revoked" | "expired";
export type HumanInviteEvent = "accept" | "revoke" | "expire";

export const HUMAN_INVITE_TERMINAL_STATES: readonly HumanInviteState[] = [
  "accepted",
  "revoked",
  "expired",
] as const;

const TRANSITIONS: Readonly<
  Record<
    HumanInviteState,
    Readonly<Partial<Record<HumanInviteEvent, HumanInviteState>>>
  >
> = {
  pending: { accept: "accepted", revoke: "revoked", expire: "expired" },
  accepted: {},
  revoked: {},
  expired: {},
};

/** Pure invite FSA. pending → accepted | revoked | expired. Terminals final. */
export const decideHumanInviteTransition = (input: {
  readonly from: HumanInviteState;
  readonly event: HumanInviteEvent;
}): HumanInviteState | null => TRANSITIONS[input.from][input.event] ?? null;

export const isHumanInviteTerminal = (state: HumanInviteState): boolean =>
  HUMAN_INVITE_TERMINAL_STATES.includes(state);
