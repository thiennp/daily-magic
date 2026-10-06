import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Copilot — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "copilot",
  label: "Copilot",
  match: [
    "GitHub Copilot",
    "VS Code Copilot",
    "Copilot cloud agent",
    "Copilot Studio",
  ],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Bearer only in COPILOT_MCP_* secrets. Copilot Studio = poll (Checks on demand). No GPT Actions.",
  steps: [
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer only in an Agents secret named COPILOT_MCP_* — never in chat.`,
    `In Copilot MCP JSON: type http, url ${urls.mcpUrl}, headers.Authorization Bearer $COPILOT_MCP_<NAME>.`,
    "Copilot Studio agents: no wake link — use poll. Owner badge Checks on demand. Check list_project_inbox only when your user asks (at most once a minute).",
    "After Approve, call tools over that MCP session (or Studio HTTPS using the same bearer).",
    "For non-Studio Copilot: check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
