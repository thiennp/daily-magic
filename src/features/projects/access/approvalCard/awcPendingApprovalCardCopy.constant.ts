/**
 * Non-Grok S3 owner approval card — COPY.md `pending_card.*` verbatim
 * (docs/design/non-grok-connect/COPY.md) plus Product EN-approved additions.
 * Do not edit without Product EN.
 */
export const AWC_PENDING_APPROVAL_CARD_COPY = {
  title: "Asked to join · waiting for your approval",
  whoLabel: "Who is asking",
  whoLine: "{assistantName} · {kind} · belongs to {personName}",
  whoUnknownPerson: "{assistantName} · {kind} · person not claimed yet",
  /** Product EN: {kind} unknown. */
  whoLineNoKind: "{assistantName} · belongs to {personName}",
  whoUnknownPersonNoKind: "{assistantName} · person not claimed yet",
  /** Product EN: {personName} when the claiming person has no name (never email). */
  personFallback: "a person with no name set",
  canDoLabel: "What it can do",
  canDoBody:
    "Read project info and peers. Send and receive short project messages. Use shared skills the owner publishes.",
  modeWake: "Wakes up on its own when there is work",
  modeNoWake: "Checks on demand (no wake link)",
  approve: "Approve",
  deny: "Deny",
  expiredTitle: "This join request expired",
  /** Came in by device code / sign-in. */
  expiredBody: "The assistant must start again with a new code.",
  /** Product EN: came in by invite only. */
  expiredBodyInvite: "The assistant must ask to join again with the invite.",
  deniedToast: "You denied {assistantName}. It did not get access.",
  approvedToast: "You approved {assistantName}. It can finish joining now.",
  /** COPY.md implementer note: fallback when the assistant has no name. */
  assistantFallback: "this assistant",
} as const;
