/**
 * S0 run approval card — Product EN.
 * Title and body: Product decision 2026-10-06 (replaces the old
 * "Approve agent dispatch?" copy). Time-left and ended lines verbatim from
 * docs/design/local-cli-project-agents/COPY-S0-A-B-C.md §1.1
 * (`s0.approval.expiresLine`, `.expiredTitle`, `.expiredBody`).
 * Richer title/folder when the live payload carries tool + computer.
 * Buttons reuse AWC_PENDING_APPROVAL_CARD_COPY.approve / .deny.
 */
export const DISPATCH_APPROVAL_CARD_COPY = {
  title: "Approve this task?",
  body: "{requester} wants to start a task on your computer.",
  bodyNoRequester: "Someone in this project wants to start a task on your computer.",
  /** Stands in for {requester} in `expiredBody` when the card has no name. */
  requesterFallback: "Someone in this project",
  /** When tool + computer are on the payload. */
  richTitle: "{requester} wants {tool} to run a task on {computer}",
  richTitleNoRequester:
    "Someone in this project wants {tool} to run a task on {computer}",
  folderLine: "Folder: {projectFolder}",
  expiresLine:
    "Nothing runs unless you approve. This request ends in {minutes} min.",
  expiredTitle: "This request ended",
  expiredBody: "Nothing ran. {requester} can send the task again.",
} as const;
