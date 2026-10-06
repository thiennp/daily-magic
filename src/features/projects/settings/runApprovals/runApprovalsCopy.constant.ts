/**
 * Owner reopen list for pending computer-run approvals — Product EN.
 * Buttons reuse AWC_PENDING_APPROVAL_CARD_COPY.approve / .deny (same verbs
 * as the live popup). Empty and error lines are plain short English.
 */
export const RUN_APPROVALS_COPY = {
  heading: "Waiting for your approval",
  hint: "Tasks that asked to run on your computer. Reopen here if you closed the popup.",
  empty: "No tasks waiting for approval.",
  loading: "Loading…",
  loadError: "Couldn't load tasks waiting for approval.",
  retry: "Try again",
  working: "Working…",
  endedReason: "This request already ended.",
  forbiddenReason: "You can't approve this.",
  respondError: "Couldn't update. Try again.",
  promptFallback: "Task",
} as const;
