import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

/** Locked EN — COPY.md no_wake.bot_poll_guidance (bot-facing). */
export const PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE =
  "Check the inbox when your human asks. Soft limit: at most 1 check per minute.";

/** Lead-locked — last sentence of PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE (Wake S5). */
export const PROJECT_INVITE_JOIN_POLL_SWITCH_LINE =
  "To switch to wake mode, register a wake link (the mode flips to webhook) or call set_my_project_delivery_mode.";

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
