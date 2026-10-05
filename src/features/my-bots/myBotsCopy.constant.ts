/** Copy for the My bots ownership screen. */
export const MY_BOTS_COPY = {
  title: "My bots",
  description:
    "Claim a bot with a code from issue_bot_claim_code, then manage its project webhooks. Only you can unclaim a bot you own.",
  claimHeading: "Claim a bot",
  claimHint:
    "Ask your bot for a claim code (issue_bot_claim_code). Codes expire in 10 minutes and work once.",
  claimPlaceholder: "awc_claim_…",
  claimSubmit: "Claim",
  claimSubmitting: "Claiming…",
  listHeading: "Owned bots",
  listEmpty: "No bots claimed yet.",
  unclaim: "Unclaim",
  unclaiming: "Unclaiming…",
  webhookToggle: "Grok webhook",
  webhookHide: "Hide",
  membershipLabel: "Project",
  failed: "Something went wrong.",
  locked: "Too many failed attempts. Try again later.",
} as const;
