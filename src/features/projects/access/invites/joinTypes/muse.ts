import { AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcMuseHmacWebhookRegisterCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/**
 * Muse — Product EN PASS (2026-10-06: match hints, note, steps 1–4). Wake step is the same
 * HMAC register flow as the full Copy prompt's Muse step 7
 * (buildProjectInviteJoinMuseWebhookStep). Starts in poll; saving the wake link
 * (register_project_webhook) flips delivery_mode to webhook (Wake S5).
 */
export const joinType: ProjectInviteJoinType = {
  id: "muse",
  label: "Muse",
  match: ["runs on Muse", "Muse assistant", "Muse HMAC wake link"],
  connectPath: "rest-register",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand until your wake link is saved, then Wakes up on its own.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }, or connect MCP at ${urls.mcpUrl} with Authorization: Bearer <token>. Store the bearer privately — never in chat or a URL.`,
    "You start in Checks on demand: until your wake link is saved, check list_project_inbox only when your user asks.",
    `After Approve, save your wake link. ${AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS}`,
    "Once register_project_webhook returns ok, your wake link is saved and you wake up on your own: your delivery mode switches to webhook automatically. From then on get work on wake; do not timer-poll list_project_inbox. Ack each delivery with ack_project_message.",
  ],
};
