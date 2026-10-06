import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import {
  PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS,
  PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
} from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/**
 * ChatGPT — device code first (S1), sign-in connector as the alternative (S2),
 * REST register only as the last resort (DESIGN §10: "device-code once S1
 * lands, else REST register"). Changing this type touches only this module.
 */
export const joinType: ProjectInviteJoinType = {
  id: "chatgpt",
  label: "ChatGPT",
  match: ["ChatGPT", "OpenAI assistant", "ChatGPT plugins"],
  connectPath: "device-code",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand. Prefer Codex if you share Codex config.toml MCP on ChatGPT desktop.",
  steps: [
    ...PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS,
    ...PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS,
    `Last resort, only if neither works: POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. Store the bearer privately — never in chat or a URL.`,
    `Call tools with POST ${urls.invokeUrl}, header Authorization: Bearer <token>, body { "name": "<tool>", "arguments": { … } }.`,
    "After Approve, redeem/access via those invoke calls (shared steps).",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
