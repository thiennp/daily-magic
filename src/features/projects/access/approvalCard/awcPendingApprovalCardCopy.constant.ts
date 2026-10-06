/**
 * Non-Grok S3 owner approval card — COPY.md `pending_card.*` verbatim
 * (docs/design/non-grok-connect/COPY.md). Do not edit without Product EN.
 */
export const AWC_PENDING_APPROVAL_CARD_COPY = {
  title: "Asked to join · waiting for your approval",
  whoLabel: "Who is asking",
  whoLine: "{assistantName} · {kind} · belongs to {personName}",
  whoUnknownPerson: "{assistantName} · {kind} · person not claimed yet",
  canDoLabel: "What it can do",
  canDoBody:
    "Read project info and peers. Send and receive short project messages. Use shared skills the owner publishes.",
  modeWake: "Wakes up on its own when there is work",
  modeNoWake: "Checks on demand (no wake link)",
  approve: "Approve",
  deny: "Deny",
  expiredTitle: "This join request expired",
  expiredBody: "The assistant must start again with a new code.",
  deniedToast: "You denied {assistantName}. It did not get access.",
  approvedToast: "You approved {assistantName}. It can finish joining now.",
  /** COPY.md implementer note: fallback when the assistant has no name. */
  assistantFallback: "this assistant",
} as const;

/**
 * NEEDS PRODUCT EN — written by AW Invite, not in COPY.md. Used only when the
 * locked line has no value for {kind} / {personName}.
 */
export const AWC_PENDING_APPROVAL_CARD_DRAFT_COPY = {
  whoLineNoKind: "{assistantName} · belongs to {personName}",
  whoUnknownPersonNoKind: "{assistantName} · person not claimed yet",
  personFallback: "its person",
} as const;
