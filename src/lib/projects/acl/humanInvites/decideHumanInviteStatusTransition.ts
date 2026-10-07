import type { HumanInviteStatus } from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";

/**
 * DB status FSA (108 `status` column). Separate from the older pure
 * decideHumanInviteTransition (062 semantics, where "accepted" = joined).
 * Here "accepted" = invitee accepted and waits for the owner's Approve.
 */
export type HumanInviteStatusEvent =
  | "accept_direct"
  | "accept_for_approval"
  | "approve"
  | "deny"
  | "revoke"
  | "expire";

const TRANSITIONS: Readonly<
  Record<
    HumanInviteStatus,
    Readonly<Partial<Record<HumanInviteStatusEvent, HumanInviteStatus>>>
  >
> = {
  pending: {
    accept_direct: "approved",
    accept_for_approval: "accepted",
    revoke: "revoked",
    expire: "expired",
  },
  accepted: { approve: "approved", deny: "revoked" },
  approved: {},
  revoked: {},
  expired: {},
};

export const decideHumanInviteStatusTransition = (input: {
  readonly from: HumanInviteStatus;
  readonly event: HumanInviteStatusEvent;
}): HumanInviteStatus | null => TRANSITIONS[input.from][input.event] ?? null;
