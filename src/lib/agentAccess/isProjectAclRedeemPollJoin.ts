import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

/**
 * Redeem response picks poll guidance only when the assistant passed a
 * joinType that resolves to poll (Wake S5 resolver). Active: the mode written
 * at join (a wake link keeps webhook). Pending: no seat yet, so no wake link.
 * No joinType → false (existing wake-routine text).
 */
export const isProjectAclRedeemPollJoin = (input: {
  readonly joinPlatform: string | null;
  readonly membershipDeliveryMode?: ProjectMembershipDeliveryMode;
}): boolean => {
  if (input.joinPlatform === null) return false;
  const mode =
    input.membershipDeliveryMode ??
    resolveInitialProjectMembershipDeliveryMode({
      platform: input.joinPlatform,
      hasWakeLink: false,
    });
  return mode === "poll";
};
