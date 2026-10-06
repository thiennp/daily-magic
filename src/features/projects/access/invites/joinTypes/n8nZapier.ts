import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** n8n/Zapier — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "n8n-zapier",
  label: "n8n/Zapier",
  match: ["n8n", "Zapier", "automation workflow"],
  connectPath: "rest-register",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand. n8n may use MCP Client Bearer to the same MCP URL.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer in the workflow credential vault — never in chat.`,
    `Call tools with POST ${urls.invokeUrl} and Authorization: Bearer <token>.`,
    `n8n optional: MCP Client → HTTP → ${urls.mcpUrl} → Bearer auth with the same token.`,
    "After Approve, redeem and work through invoke or MCP Client tools.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
