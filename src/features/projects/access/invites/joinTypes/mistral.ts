import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
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
    ...PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>" }. Store the bearer in connector credentials — never in chat.`,
    `Admin: Connectors → Add Connector → Custom MCP Connector → Server URL ${urls.mcpUrl}.`,
    "Use HTTP Bearer auth with Bearer <token>.",
    "After Approve, use AgentWitch tools through that connector.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
