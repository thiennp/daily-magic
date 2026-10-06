import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import {
  DEVICE_CODE_INTERVAL_SECONDS,
  DEVICE_CODE_TTL_MS,
  DEVICE_VERIFICATION_URI,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";

const urls = buildAgentAccessUrls();
const TTL_MINUTES = DEVICE_CODE_TTL_MS / 60000;

/** S1 device-code endpoints (RFC 8628), on the canonical public origin. */
export const PROJECT_INVITE_JOIN_DEVICE_START_URL = `${urls.origin}/api/agent-access/oauth/device/start`;
export const PROJECT_INVITE_JOIN_DEVICE_TOKEN_URL = `${urls.origin}/api/agent-access/oauth/device/token`;

/**
 * S1 — device code (short code the user confirms). NEEDS PRODUCT EN (bot-facing).
 * Ownership only: project access still needs the owner's Approve after redeem.
 * Used by ChatGPT today; other types switch by spreading it in their module.
 */
export const PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS: readonly string[] = [
  `Device code (preferred): POST ${PROJECT_INVITE_JOIN_DEVICE_START_URL} with { "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }. The response has device_code, user_code (XXXX-XXXX), verification_uri, verification_uri_complete, expires_in (${DEVICE_CODE_TTL_MS / 1000} seconds) and interval (${DEVICE_CODE_INTERVAL_SECONDS} seconds). Keep device_code private.`,
  `Show your user the user_code and the link verification_uri_complete (or ${DEVICE_VERIFICATION_URI}, then type the code). They sign in and confirm "You'll be this assistant's owner". That confirms ownership only; it does not give you project access.`,
  `Poll POST ${PROJECT_INVITE_JOIN_DEVICE_TOKEN_URL} with { "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "<device_code>" }, waiting at least interval seconds between polls. authorization_pending: wait and poll again. slow_down: use the larger interval in the response from then on. access_denied: stop and tell your user. expired_token (after ${TTL_MINUTES} minutes): start again for a new code.`,
  `On success, store access_token (Bearer, 7 days) and refresh_token (90 days) privately — never in chat or a URL. Call tools with Authorization: Bearer <access_token> on MCP ${urls.mcpUrl} or REST invoke.`,
  "Then redeem the invite with your joinType (shared steps). The project owner still has to Approve before you get access.",
];

/**
 * S2 — sign-in connector (remote MCP OAuth). NEEDS PRODUCT EN (bot-facing).
 * Ownership only: project access still needs the owner's Approve. Discovery is
 * left to the host (no well-known URL printed; path-scoped discovery is
 * feat/awc-oauth-public-origin).
 */
export const PROJECT_INVITE_JOIN_SIGNIN_CONNECTOR_STEPS: readonly string[] = [
  `Sign-in connector (alternative): in your app's connector settings, add ${urls.mcpUrl} as a custom remote MCP connector with sign-in (OAuth). Your app finds the sign-in page and registers itself automatically.`,
  `Your user signs in to AgentWitch in the window your app opens and confirms "You'll be this assistant's owner". That confirms ownership only; it does not give you project access.`,
  "Then redeem the invite through the connector with your joinType (shared steps). The project owner still has to Approve before you get access.",
];
