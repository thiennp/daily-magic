import type { PreflightCheckClass } from "./preflightStatus.constant";

/** Catalog rows: id, name, class, intent, fix. */
export type PreflightCatalogRow = readonly [
  string,
  string,
  PreflightCheckClass,
  string,
  string,
];

export const PREFLIGHT_CHECK_ROWS_A: readonly PreflightCatalogRow[] = [
  [
    "pf.writer-login",
    "Writer signed in",
    "block",
    "The writing tool on this Mac is signed in before a run that needs it.",
    "Open Cursor or Claude and sign in, then try again.",
  ],
  [
    "pf.folder-exists",
    "Project folder found",
    "block",
    "The project folder on this Mac is present.",
    "Open the project folder or reconnect the project, then try again.",
  ],
  [
    "pf.mcp-up",
    "Local tools ready",
    "warn",
    "The local tools service on this Mac answers a simple list request.",
    "Restart Agent Witch Local, wait a few seconds, then try again.",
  ],
  [
    "pf.git-fetch-fresh",
    "Latest main known",
    "block",
    "This Mac has fetched the latest main tip before updating main.",
    "Run git fetch for origin, then try again.",
  ],
  [
    "pf.no-force-push",
    "Safe push only",
    "block",
    "Refuse a push that rewrites main history.",
    "Use a fast-forward push to main, or land a new tip branch. Do not force-push.",
  ],
  [
    "pf.box-push-forbidden",
    "Push from your Mac",
    "block",
    "Refuse a push from the shared box, which has no GitHub sign-in.",
    "Push from your Mac instead of the shared box.",
  ],
];
