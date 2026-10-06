import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Codex — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "codex",
  label: "Codex",
  match: ["Codex CLI", "Codex IDE", "ChatGPT desktop Codex host"],
  connectPath: "mcp-bearer",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    ...PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Put the bearer in an environment variable — never in chat.`,
    `In config.toml: url = "${urls.mcpUrl}" and bearer_token_env_var = "<YOUR_ENV_NAME>".`,
    "After Approve, call project tools through that MCP server.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
