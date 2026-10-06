import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

/** No type on the invite (null, not undefined) and no usable joinType. */
export const isProjectAclRedeemNoTypeJoin = (input: {
  readonly joinPlatform: string | null;
  readonly invitePlatform?: string | null;
}): boolean => input.joinPlatform === null && input.invitePlatform === null;

/**
 * Redeem response picks poll guidance when the assistant passed a joinType
 * that resolves to poll (Wake S5 resolver), or when neither the invite nor
 * the redeem names a type (Lead (a): Checks on demand). Active: the mode
 * written at join (a wake link keeps webhook). Pending: no seat yet, so no
 * wake link. Typed invite + no joinType → false (existing wake-routine text).
 */
export const isProjectAclRedeemPollJoin = (input: {
  readonly joinPlatform: string | null;
  readonly invitePlatform?: string | null;
  readonly membershipDeliveryMode?: ProjectMembershipDeliveryMode;
}): boolean => {
  const noType = isProjectAclRedeemNoTypeJoin(input);
  if (input.joinPlatform === null && !noType) return false;
  const mode =
    input.membershipDeliveryMode ??
    resolveInitialProjectMembershipDeliveryMode({
      platform: input.joinPlatform,
      hasWakeLink: false,
      noWakeChosen: noType,
    });
  return mode === "poll";
};
