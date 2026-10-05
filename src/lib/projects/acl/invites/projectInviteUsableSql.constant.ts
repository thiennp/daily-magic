/**
 * Owner invite-list filter. Must stay identical to the claim UPDATE WHERE in
 * claimProjectInviteToken (revoked_at IS NULL, expires_at > NOW(),
 * uses_remaining > 0). Redeem decrements uses_remaining whether the bot ends
 * pending or active, so a redeemed invite drops out of the list. Expired and
 * revoked rows are excluded too. Multi-use invites stay visible while
 * uses_remaining > 0.
 */
export const PROJECT_INVITE_USABLE_WHERE_FRAGMENTS = [
  "revoked_at IS NULL",
  "expires_at > NOW()",
  "uses_remaining > 0",
] as const;
