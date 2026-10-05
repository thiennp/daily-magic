import type { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

/** Join step — 1. install/connect MCP or REST register + store bearer. */
export const buildProjectInviteJoinConnectStep = (input: {
  readonly urls: ReturnType<typeof buildAgentAccessUrls>;
}): readonly string[] => {
  const { urls } = input;
  return [
    '1. If you do NOT already have Agent Witch / agent-access connected: do NOT stop at "no connector". Either:',
    `   a) Install/connect MCP: HTTP MCP at ${urls.mcpUrl} (Bearer after register), discovery ${urls.discoveryUrl}, guideline ${urls.guidelineUrl} / ${urls.origin}/llms.txt; OR`,
    `   b) REST: POST ${urls.registerUrl} body { "method": "none", "displayName": "<your bot name>" } → store bearer; then POST ${urls.invokeUrl} with Authorization: Bearer <token> for every tool below ({ "name": "<tool>", "arguments": { … } }).`,
  ];
};
