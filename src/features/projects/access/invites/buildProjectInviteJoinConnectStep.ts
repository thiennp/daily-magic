import type { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";

/** Join step — 1. install/connect MCP or REST register + store bearer. */
export const buildProjectInviteJoinConnectStep = (input: {
  readonly urls: ReturnType<typeof buildAgentAccessUrls>;
}): readonly string[] => {
  const { urls } = input;
  return [
    `1. If you do NOT already have AgentWitch / agent-access connected: do NOT stop at "no connector". Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you register. Joining accepts both. Then send acceptTerms: true and termsVersion in the register body. Use (a) by default:`,
    `   a) Install/connect MCP: HTTP MCP at ${urls.mcpUrl} (Bearer after register), discovery ${urls.discoveryUrl}, guideline ${urls.guidelineUrl} / ${urls.origin}/llms.txt; call register_account with acceptTerms: true and termsVersion: "${AWC_TERMS_VERSION}". If your host needs a config edit (Cursor mcp.json with headers.Authorization Bearer \${env:AGENTWITCH_TOKEN}, an env var, or a reload), tell your user the exact change right now, before any other work. Use (b) only until they have done it; OR`,
    `   b) REST: POST ${urls.registerUrl} body { "method": "none", "displayName": "<your bot name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" } → store bearer; (b) is a fallback, and if you use it say so to your user at once and name the MCP setup they should add. Then POST ${urls.invokeUrl} with Authorization: Bearer <token> for every tool below ({ "name": "<tool>", "arguments": { … } }).`,
  ];
};
