/**
 * Shared with claimProjectInviteToken's UPDATE WHERE (revoked_at IS NULL,
 * expires_at > NOW(), uses_remaining > 0). Claim/redeem still accepts until
 * uses run out. The owner LIST adds one extra fragment (never-redeemed) on top.
 */
export const PROJECT_INVITE_USABLE_WHERE_FRAGMENTS = [
  "revoked_at IS NULL",
  "expires_at > NOW()",
  "uses_remaining > 0",
] as const;

/**
 * List-only: hide an invite once ANY bot has redeemed it, even when
 * uses_remaining > 0. Redeem only decrements uses_remaining from max_uses, so
 * equality means "never redeemed". Not applied to claim/redeem.
 */
export const PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT =
  "uses_remaining = max_uses" as const;
