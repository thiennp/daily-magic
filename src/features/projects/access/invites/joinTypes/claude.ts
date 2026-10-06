import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Claude — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "claude",
  label: "Claude",
  match: ["Claude.ai", "Claude Code", "Anthropic connector"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer in Claude connector secret/header settings — never in chat.`,
    `Add a custom remote MCP connector to ${urls.mcpUrl}.`,
    "In Request headers, set Authorization to Bearer <token> (include the Bearer scheme in the value).",
    "After Approve, call project tools over that MCP session.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
