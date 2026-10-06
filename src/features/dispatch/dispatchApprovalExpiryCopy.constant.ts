/**
 * S0 run approval card, expiry lines — Product EN verbatim from
 * docs/design/local-cli-project-agents/COPY-S0-A-B-C.md §1.1
 * (`s0.approval.expiresLine`, `.expiredTitle`, `.expiredBody`).
 */
export const DISPATCH_APPROVAL_EXPIRY_COPY = {
  expiresLine:
    "Nothing runs unless you approve. This request ends in {minutes} min.",
  expiredTitle: "This request ended",
  expiredBody: "Nothing ran. {requester} can send the task again.",
} as const;
