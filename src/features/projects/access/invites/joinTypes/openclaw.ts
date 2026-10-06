import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** OpenClaw — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "openclaw",
  label: "OpenClaw",
  match: ["OpenClaw", "openclaw mcp", "Control UI MCP"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    ...PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "2026-09-16" }. Store the bearer via OpenClaw secret/header settings — never as a chat literal.`,
    `Add Streamable HTTP MCP: URL ${urls.mcpUrl}; set Authorization bearer in the scoped header/secret editor.`,
    "Run openclaw mcp doctor <name> --probe.",
    "After Approve, use those tools for project work.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
