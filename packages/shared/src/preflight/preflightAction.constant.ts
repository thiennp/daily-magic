/** Risky actions that preflight can gate when Preflight is ON. */
export const PREFLIGHT_ACTION_IDS = [
  "act.push-ff",
  "act.deploy",
  "act.migrate",
  "act.delete",
  "act.send",
  "act.secrets",
] as const;

export type PreflightActionId = (typeof PREFLIGHT_ACTION_IDS)[number];

/**
 * Required catalog checks per action (v1). Only `pf.*` ids from the catalog.
 * Pitfall-fed `pit.*` checks are unioned at resolve time.
 *
 * Defaults for design gaps:
 * - migrate: secrets scan only (`pf.backup-or-dry-run` not in the v1 catalog of 12)
 * - delete: folder exists (confirm-target is a computer UI step, not a catalog id)
 * - send: secrets scan (recipient confirm is Mac UI; body must stay secret-safe)
 */
export const PREFLIGHT_ACTION_REQUIRED_CHECKS: Readonly<
  Record<PreflightActionId, readonly string[]>
> = {
  "act.push-ff": [
    "pf.git-fetch-fresh",
    "pf.clean-worktree-policy",
    "pf.no-force-push",
    "pf.box-push-forbidden",
    "pf.arch-ci",
  ],
  "act.deploy": [
    "pf.health-matches-main",
    "pf.smoke",
    "pf.install-bundle-intact",
  ],
  "act.migrate": ["pf.secrets-fingerprint-only"],
  "act.delete": ["pf.folder-exists"],
  "act.send": ["pf.secrets-fingerprint-only"],
  "act.secrets": ["pf.secrets-fingerprint-only"],
};

/** Convention smoke script when the project has no meta override. */
export const PREFLIGHT_DEFAULT_SMOKE_COMMAND = "npm run smoke";

/** NRG lean: record a pitfall hit when a `pit.*` check blocks. */
export const PREFLIGHT_AUTO_RECORD_PITFALL_HIT = true;

/** Poll budget for live site matching main (design default 120s). */
export const PREFLIGHT_HEALTH_POLL_TIMEOUT_MS = 120_000;

export const PREFLIGHT_RERUN_HINT =
  "agentwitch setup_project --rerun-preflight";
