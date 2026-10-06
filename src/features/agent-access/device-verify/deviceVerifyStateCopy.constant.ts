/**
 * Non-Grok S4 verify-page states — NEEDS PRODUCT EN (written by AW Invite,
 * not in COPY.md). Every other verify string stays in DEVICE_VERIFY_COPY.
 */
export const DEVICE_VERIFY_STATE_COPY = {
  /** Revisit after this person already confirmed the same code. */
  alreadyOwner: "You're already this assistant's owner.",
  /** Heading over the next step, shown after confirm. */
  nextStepLabel: "Next step",
  /** Points at the project owner's Approve (ownership is not project access). */
  nextStep:
    "Your assistant asks to join a project with its invite. The project owner approves it in Access › People.",
} as const;
