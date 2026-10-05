import type { PreflightCatalogRow } from "./preflightCheckCatalogRowsA.constant";

export const PREFLIGHT_CHECK_ROWS_B: readonly PreflightCatalogRow[] = [
  [
    "pf.health-matches-main",
    "Live site matches main",
    "block",
    "The live site health commit matches the main tip before calling the work done.",
    "Wait for the live site to update, then run preflight again.",
  ],
  [
    "pf.smoke",
    "Smoke check passed",
    "block",
    "The project smoke check passed after the live site matched main.",
    "Fix the smoke failure, then run preflight again.",
  ],
  [
    "pf.arch-ci",
    "Architecture check",
    "block",
    "The architecture check passes before landing on main.",
    "Run npm run ci:architecture, fix any findings, then try again.",
  ],
  [
    "pf.install-bundle-intact",
    "Install files present",
    "block",
    "The install bundle files are still on disk after a build.",
    "Restore the install bundle files, then try again.",
  ],
  [
    "pf.secrets-fingerprint-only",
    "Secrets stay private",
    "block",
    "Command output shows only that a secret exists, its path, or a short fingerprint.",
    "Remove secret values from the command or logs, then try again.",
  ],
  [
    "pf.clean-worktree-policy",
    "Home checkout safe",
    "block",
    "Refuse reset or clean of the home daily-magic checkout.",
    "Use a fresh folder under /tmp for this work. Leave the home checkout alone.",
  ],
];
