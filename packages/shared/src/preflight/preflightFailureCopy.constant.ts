/**
 * Product copy for preflight failure UX (token-saver note 02).
 * Keep in sync with docs/design/token-saver-queue/02-preflight-failure-ux.md.
 */
export const PREFLIGHT_FAILURE_COPY = {
  title: "Preflight blocked",
  reasonLabel: "Reason",
  checkLabel: "Check",
  fixLabel: "Fix",
  rerunLabel: "Rerun",
  rerunButton: "Run preflight again",
  secretSafeFallback:
    "A required secret is missing (name only; value not shown).",
  running: "Running preflight…",
  erroredPrefix: "Preflight could not run:",
  skipped: "Preflight is off for this project.",
  fixOnMac: "Fix on Mac",
  fixOnMacHint:
    "This check runs on your Mac. Cloud cannot clear it — open Agent Witch Local and run preflight again.",
  detailsSummary: "Details",
} as const;
