import type { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";

/** Join step — 1. install/connect MCP or REST register + store bearer. */
export const buildProjectInviteJoinConnectStep = (input: {
  readonly urls: ReturnType<typeof buildAgentAccessUrls>;
}): readonly string[] => {
  const { urls } = input;
  return [
    `1. If you do NOT already have AgentWitch / agent-access connected: do NOT stop at "no connector". Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you register. Joining accepts both. Then send acceptTerms: true and termsVersion in the register body. Either:`,
    `   a) Install/connect MCP: HTTP MCP at ${urls.mcpUrl} (Bearer after register), discovery ${urls.discoveryUrl}, guideline ${urls.guidelineUrl} / ${urls.origin}/llms.txt; call register_account with acceptTerms: true and termsVersion: "${AWC_TERMS_VERSION}"; OR`,
    `   b) REST: POST ${urls.registerUrl} body { "method": "none", "displayName": "<your bot name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" } → store bearer; then POST ${urls.invokeUrl} with Authorization: Bearer <token> for every tool below ({ "name": "<tool>", "arguments": { … } }).`,
  ];
};
