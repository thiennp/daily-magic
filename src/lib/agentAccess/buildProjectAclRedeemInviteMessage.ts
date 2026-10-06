import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE } from "@/lib/projects/acl/projectMembershipPollJoinGuidance.constant";

/** NEEDS PRODUCT EN — lead-in before the locked poll guidance on a pending redeem. */
export const REDEEM_PENDING_POLL_LEAD_IN =
  "When status becomes active (owner Approves, or this invite had auto-approve on):";

/**
 * redeem_project_invite response message. Wake (Grok / no joinType): the
 * existing wake-routine text, unchanged. Poll (joinType resolves to poll):
 * the same lead sentences, then the locked Checks on demand guidance.
 */
export const buildProjectAclRedeemInviteMessage = (input: {
  readonly status: "active" | "pending";
  readonly poll: boolean;
  readonly hasSuggestedName: boolean;
}): string => {
  if (input.status === "active") {
    return input.poll
      ? "Invite redeemed and membership is active (the owner turned on auto-approve for this invite). Call get_my_project_access; continue join steps. " +
          PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE +
          " Prefer rotate_project_api_key if you need a fresh awc_proj_ key."
      : "Invite redeemed and membership is active (the owner turned on auto-approve for this invite). Call get_my_project_access; continue join steps. Immediately create your Grok webhook-triggered routine for this project if missing (if Grok Bot shows your user a confirm card, they approve it). Then post the routine's Webhook URL and Webhook key links in your user's chat so they can copy both; have the project owner click Add wake link at Access › People › Members › <your nickname> › Grok wake link and paste them there, never into chat. Also give them this direct link filled with projectId and membershipId from this response: " +
          buildAgentAccessUrls().origin +
          "/projects/{projectId}#wake-link-{membershipId}. You cannot see the key. Prefer rotate_project_api_key if you need a fresh awc_proj_ key.";
  }
  if (input.poll) {
    const lead = input.hasSuggestedName
      ? "Invite redeemed. Membership is pending until the project owner Approves. Your suggested nickname was stored for owner prefill (owner may change it). No scoped key yet. Call get_my_project_access."
      : "Invite redeemed. Membership is pending until the project owner Approves and sets your project display name. No scoped key yet. Call get_my_project_access.";
    return `${lead} ${REDEEM_PENDING_POLL_LEAD_IN} ${PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE}`;
  }
  return input.hasSuggestedName
    ? "Invite redeemed. Membership is pending until the project owner Approves. Your suggested nickname was stored for owner prefill (owner may change it). No scoped key yet. Call get_my_project_access. When status becomes active (owner Approves, or this invite had auto-approve on), immediately create your Grok webhook-triggered routine if missing, post the Webhook URL and Webhook key links in your user's chat, have the project owner paste at Access › People › Members › <your nickname> › Grok wake link (Add wake link) — never into chat — and give them the direct wake-link URL with projectId and membershipId filled in; do not wait to be asked."
    : "Invite redeemed. Membership is pending until the project owner Approves and sets your project display name. No scoped key yet. Call get_my_project_access. When status becomes active (owner Approves, or this invite had auto-approve on), immediately create your Grok webhook-triggered routine if missing, post the Webhook URL and Webhook key links in your user's chat, have the project owner paste at Access › People › Members › <your nickname> › Grok wake link (Add wake link) — never into chat — and give them the direct wake-link URL with projectId and membershipId filled in; do not wait to be asked.";
};
