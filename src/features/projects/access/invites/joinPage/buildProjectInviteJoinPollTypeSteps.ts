import {
  PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE_LINE as PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE,
  PROJECT_MEMBERSHIP_POLL_JOIN_SWITCH_LINE as PROJECT_INVITE_JOIN_POLL_SWITCH_LINE,
} from "@/lib/projects/acl/projectMembershipPollJoinGuidance.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

/** Locked lines live in lib (shared with the redeem response). */
export {
  PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE,
  PROJECT_INVITE_JOIN_POLL_SWITCH_LINE,
};

/** NEEDS PRODUCT EN — minimal bot-facing placeholder for the redeem joinType arg. */
export const buildProjectInviteJoinRedeemTypeLine = (typeId: string): string =>
  `Call redeem_project_invite with "joinType": "${typeId}".`;

/**
 * /join only: extra steps for a poll-type (no wake link) bot type, appended to
 * its own steps. Tells the assistant it checks on demand and passes its type
 * to redeem so the join-time delivery_mode is poll. Webhook types: none.
 */
export const buildProjectInviteJoinPollTypeSteps = (
  type: Pick<ProjectInviteJoinType, "id" | "deliveryMode">,
): readonly string[] =>
  type.deliveryMode === "poll"
    ? [
        buildProjectInviteJoinRedeemTypeLine(type.id),
        `${PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE} ${PROJECT_INVITE_JOIN_POLL_SWITCH_LINE}`,
      ]
    : [];
