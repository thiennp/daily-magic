import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Mistral — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "mistral",
  label: "Mistral",
  match: ["Mistral", "Le Chat", "Mistral Work connector"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer in connector credentials — never in chat.`,
    `Admin: Connectors → Add Connector → Custom MCP Connector → Server URL ${urls.mcpUrl}.`,
    "Use HTTP Bearer auth with Bearer <token>.",
    "After Approve, use AgentWitch tools through that connector.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
