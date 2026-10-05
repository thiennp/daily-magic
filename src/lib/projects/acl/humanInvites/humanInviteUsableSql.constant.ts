/**
 * Shared usable-invite WHERE (not pending/revoked/expired/exhausted).
 * Claim CTE and list SELECT both embed these; list also adds never-redeemed.
 */
export const HUMAN_INVITE_USABLE_WHERE_FRAGMENTS = [
  "revoked_at IS NULL",
  "expires_at > NOW()",
  "uses_remaining > 0",
] as const;

/** Joined form for sql.unsafe embedding (one source of truth). */
export const HUMAN_INVITE_USABLE_WHERE_SQL =
  HUMAN_INVITE_USABLE_WHERE_FRAGMENTS.join(" AND ");

/** List-only: hide once any accept has consumed a use. */
export const HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT =
  "uses_remaining = max_uses" as const;
