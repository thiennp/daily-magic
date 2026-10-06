import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Gemini — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "gemini",
  label: "Gemini",
  match: ["Gemini CLI", "Google Gemini", "gemini mcp"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer in settings/env — never in chat.`,
    `Add HTTP MCP with httpUrl ${urls.mcpUrl} and headers.Authorization Bearer <token>.`,
    "After Approve, use AgentWitch tools over MCP.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
