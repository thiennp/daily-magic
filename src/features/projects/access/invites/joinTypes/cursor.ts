import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Cursor — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "cursor",
  label: "Cursor",
  match: ["Cursor IDE", "Cursor agent", "mcp.json"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    ...PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer in an env secret — never in chat.`,
    `Add a remote server in mcp.json: url ${urls.mcpUrl}, headers.Authorization Bearer \${env:AGENTWITCH_TOKEN}.`,
    "After Approve, use AgentWitch tools from that MCP session.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
