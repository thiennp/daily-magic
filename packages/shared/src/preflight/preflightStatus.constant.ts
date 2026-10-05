export const PREFLIGHT_RESULT_STATUSES = [
  "pass",
  "warn",
  "block",
  "errored",
  "skipped",
] as const;

export type PreflightResultStatus = (typeof PREFLIGHT_RESULT_STATUSES)[number];

export const PREFLIGHT_CHECK_CLASSES = ["block", "warn"] as const;

export type PreflightCheckClass = (typeof PREFLIGHT_CHECK_CLASSES)[number];
