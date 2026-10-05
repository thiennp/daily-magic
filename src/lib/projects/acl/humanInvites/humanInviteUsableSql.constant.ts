/**
 * Shared with claimHumanInviteToken UPDATE WHERE.
 * List adds never-redeemed on top (hide after first accept).
 */
export const HUMAN_INVITE_USABLE_WHERE_FRAGMENTS = [
  "revoked_at IS NULL",
  "expires_at > NOW()",
  "uses_remaining > 0",
] as const;

/** List-only: hide once any accept has consumed a use. */
export const HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT =
  "uses_remaining = max_uses" as const;
