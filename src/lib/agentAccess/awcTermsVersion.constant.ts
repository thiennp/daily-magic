/**
 * Current Agent Witch Terms version required at agent-access registration.
 * Aligns with the Terms page last-updated date (September 16, 2026).
 */
export const AWC_TERMS_VERSION = "2026-09-16" as const;

export const AWC_TERMS_URL = "https://www.agentwitch.com/terms" as const;

export const AWC_PRIVACY_URL = "https://www.agentwitch.com/privacy" as const;

/** Self-explaining 400 body when acceptTerms/termsVersion are missing, false, or stale. */
export const AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR =
  `Registration requires acceptTerms: true and termsVersion: "${AWC_TERMS_VERSION}". Tell your human upfront that joining accepts the Terms and Privacy Policy. Read ${AWC_TERMS_URL} and ${AWC_PRIVACY_URL}.` as const;

export const AWC_TERMS_ACCEPTANCE_REQUIRED_CODE =
  "terms_acceptance_required" as const;
