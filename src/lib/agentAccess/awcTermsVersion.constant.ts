import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

/**
 * Current AgentWitch Terms version required at agent-access registration.
 * Aligns with the Terms page last-updated date (September 16, 2026).
 */
export const AWC_TERMS_VERSION = "2026-09-16" as const;

const agentAccessOrigin = buildAgentAccessUrls().origin;

export const AWC_TERMS_URL = `${agentAccessOrigin}/terms`;

export const AWC_PRIVACY_URL = `${agentAccessOrigin}/privacy`;

/** Self-explaining 400 body when acceptTerms/termsVersion are missing, false, or stale. */
export const AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR =
  `Registration needs acceptTerms: true and termsVersion: "${AWC_TERMS_VERSION}". First show your user ${AWC_TERMS_URL} and ${AWC_PRIVACY_URL} and get a clear yes. Joining accepts both.`;

export const AWC_TERMS_ACCEPTANCE_REQUIRED_CODE =
  "terms_acceptance_required" as const;
