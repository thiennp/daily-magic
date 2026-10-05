/**
 * Product copy for preflight failure UX (token-saver note 02 + NRG follow-up).
 */
export const PREFLIGHT_FAILURE_COPY = {
  title: "Preflight blocked",
  warnTitle: "Preflight warning",
  reasonLabel: "Reason",
  checkLabel: "Check",
  fixLabel: "Fix",
  rerunLabel: "Rerun",
  rerunButton: "Run preflight again",
  continueLabel: "Continue",
  continueHint:
    "You can keep going. Fix this when you can, then run preflight again.",
  continueButton: "Continue anyway",
  secretSafeFallback:
    "A required secret is missing (name only; value not shown).",
  running: "Running preflight…",
  /** Whole-run failure (engine could not start). */
  erroredPrefix: "Preflight could not run:",
  /** Per-check errored: the check itself could not run. Never say "failed". */
  couldntCheck: "Couldn't check",
  skipped: "Preflight is off for this project.",
  fixOnMac: "Fix on Mac",
  fixOnMacHint:
    "This check runs on your Mac. Cloud cannot clear it — open Agent Witch Local and run preflight again.",
  detailsSummary: "Details",
  fromPitfall: "From a project pitfall",
  warningsLabel: "Warnings",
} as const;
