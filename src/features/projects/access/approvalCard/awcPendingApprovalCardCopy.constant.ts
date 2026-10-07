/**
 * Owner approval card copy — DF-017 Product EN PASS (2026-10-07,
 * docs: pending-request/EN-PASS.md) on top of COPY.md `pending_card.*`.
 * Do not edit without Product EN.
 */
export const AWC_PENDING_APPROVAL_CARD_COPY = {
  title: "Wants to join",
  typeAssistant: "Assistant",
  typePerson: "Person",
  /** Claimed assistant: who it belongs to. */
  belongsTo: "Belongs to {personName}",
  /** Product EN: {personName} when the claiming person has no name (never email). */
  personFallback: "a person with no name set",
  notLinked: "Not linked to a person yet",
  /** One-line "who" summary (One Window in-feed card). */
  whoLine: "{assistantName} · {kind} · belongs to {personName}",
  whoLineNoKind: "{assistantName} · belongs to {personName}",
  whoNotLinked: "{assistantName} · {kind} · not linked to a person yet",
  whoNotLinkedNoKind: "{assistantName} · not linked to a person yet",
  notLinkedTip:
    "Nobody has said this assistant is theirs yet. You can still allow it in. Someone can link it to themselves later.",
  notLinkedInfoLabel: "What does this mean?",
  /** connectVia null = came in by invite only (same rule as the expired body). */
  viaInvite: "Asked with an invite link",
  askedToday: "Asked today, {time}",
  askedOn: "Asked {date}, {time}",
  canDoLabel: "If you approve, it can",
  /** COPY.md canDoBody split into scannable chips (same promises, no more). */
  canRead: "Read project info",
  canSeePeers: "See who is in the project",
  canSend: "Send short messages",
  canReceive: "Receive messages",
  canUseSkills: "Use skills you publish",
  /** DF-036 EN PASS: full sentence behind "Show details" ("peers" retired). */
  canDoBody:
    "Read project info and see who is in the project. Send and receive short project messages. Use shared skills the owner publishes.",
  showDetails: "Show details",
  hideDetails: "Hide details",
  modeWake: "Wakes up on its own when there is work",
  modeNoWake: "Checks in only when asked",
  showMore: "+{count} more",
  showLess: "Show less",
  nicknameLabel: "Name in this project",
  nicknameAskedFor: "This is the name it asked for. You can change it.",
  nicknameRule: "Letters and single spaces, 2–32 characters.",
  nicknameLength: "Use 2–32 letters.",
  nicknameInvalid: "Use letters only, with single spaces between words.",
  nicknameReserved: "That name is reserved.",
  nicknameRequired: "Enter a name before Approve.",
  nicknameTaken:
    "Another assistant here is already called “{name}”. Pick a different name.",
  removeNote: "You can remove it any time from Members.",
  approve: "Approve",
  deny: "Deny",
  approving: "Approving…",
  denying: "Denying…",
  approvedTitle: "{name} joined the project",
  approvedSub: "It now appears under Assistants.",
  deniedTitle: "Request from {requester} denied",
  deniedSub: "It has no access.",
  expiredTitle: "This join request expired",
  /** Came in by device code / sign-in. */
  expiredBody: "The assistant must start again with a new code.",
  /** Product EN: came in by invite only. */
  expiredBodyInvite: "The assistant must ask to join again with the invite.",
  /** COPY.md implementer note: fallback when the assistant has no name. */
  assistantFallback: "this assistant",
} as const;
