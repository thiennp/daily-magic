import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Grok Bot — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "grok-bot",
  label: "Grok Bot",
  match: ["runs in Grok Bot", "can create routines", "Grok wake link"],
  connectPath: "grok-wake",
  deliveryMode: "webhook",
  steps: [
    `Connect agent-access: MCP at ${urls.mcpUrl} with Authorization: Bearer <token>, or REST register (body includes "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}") then invoke. Store the bearer in secret settings — never in chat or a URL.`,
    "After Approve: tell your user to open this bot in the Grok Bot desktop app → info pane (bot name in chat header) → Routines → copy the wake link and key.",
    "Tell the project owner to paste both under Add wake link / Grok wake link (Access › People › Members › you). Never paste the key into chat or a project message.",
    "Call get_my_project_webhook_status with your projectId (agent-access Bearer only). Confirm grokWebhookRegistered is true.",
    "Get work on wake. Do not timer-poll list_project_inbox. Ack each delivery with ack_project_message.",
  ],
};
