/**
 * Shipped install bundle metadata (contract).
 * Canonical runtime version: `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in this module.
 */

/**
 * Bump when any install bundle artifact changes (shell, JS, deps).
 * 269 = DF-029/030/031 AWL hotfix (PO HTML in the Mac webview, watchdog +
 * repair on the H6 discovered port, /health commitSha). 268 never shipped
 * H5–H7 to existing installs because it was not bumped after ddfcfe44.
 */
/** 290 = AWL-ISO-2 cross-account folder claims + write locks. */
/** 291 = run report closes when the run ends (FAIL3). */
/** 293 = project runs fall back to the profile's linked folder when the payload has none. */
/** 294 = project knowledge capture on result send; node-pty spawn-helper exec bit. */
/** 295 = AWL-ISO-1 Landing B: one host process + service per account. */
/** 296 = AWL-ISO-4: migrate a multi-account host to one service per account. */
/** 297 = paused run closes when a history Continue answers it (b2179f2b). */
/** 298 = bundle restart waits for running/parked tasks (all profiles), 6h cap, 30s recheck. */
/** 299 = AWAITING_INPUT markers in the echoed prompt are ignored. */
/** 300 = host start closes orphaned run reports; expired paused runs close their report; Done summary skips pre-answer waits (378558e8). */
/** 301 = paused runs no longer block bundle restart (b53ecc47); known agy/CLI errors get one-sentence report summaries (9b3947bc). */
/** 302 = heartbeat reports which coding tools are ready on this computer. */
/** 303 = local Knowledge impact panel: chart empty states and runs-with-notes vs holdout chart. */
/** 304 = heartbeat also reports whether Codex is signed in. */
/** 305 = auto skills: repeated tasks raise an owner question (Ollama / agent judge); owner-LLM CLI turns fail on non-zero exit. */
/** 306 = project knowledge is captured from the final run result (it was never reached before, so notes and impact stayed 0). */
/** 307 = auto skills keep only hashes + previews when history is OFF, run completion carries the writer; local folder describe adds git remote and branch. */
/** 308 = auto skills work at module level: runs are split into steps, matched into clusters in knowledge.db, and a step repeated in 2+ runs raises the owner question. */
/** 309 = local skill index plus skills_find / skills_run MCP tools; coding-tool prompts get one line pointing to skills_find when the project has indexed skills. */
/** 310 = killed runs say why; stopped runs report stopped; report summary reaches the web; per-account Mac run.sh, migration log, stale lock cleanup. */
/** 311 = skill scripts: proposed in drafts, replayed in a temp copy, verified and seeded read-only, owner-approved, run through skills_run; per-skill token savings, holdout calls and miss stats in the heartbeat; the writer gets AGENT_WITCH_RUN_ID. */
/** 312 = dd5c338d: legacy launcher no longer stops account hosts and retires itself as a no-op; console-user bootout spares other accounts; run.sh repair reports current. */
/** 313 = per-install identity scopes same-label auto-revoke; Codex prepare fail-fast + heartbeat; Linux finish honest without systemd (name+id); ask Context so far strips ANSI/harness. */
export const AGENT_WITCH_INSTALL_BUNDLE_VERSION = "313";

/** Env / manifest key for the bundle version constant. */
export const AWI_INSTALL_BUNDLE_VERSION_CANONICAL_KEY =
  "AGENT_WITCH_INSTALL_BUNDLE_VERSION";

/** Repo-relative path to the shipped install tree served by AWC. */
export const AWI_REPO_PUBLIC_INSTALL_RELATIVE_PATH =
  "public/install/agent-witch";

/** Written to `<installRoot>/install-version.json` after install/update. */
export interface AgentWitchInstallVersionFile {
  readonly bundleVersion: string;
  readonly appOrigin?: string;
  readonly installedAt?: string;
}

export const AWI_INSTALL_VERSION_FILENAME = "install-version.json";

/** HTTP path segment AWC serves for the curl | bash installer. */
export const AWI_PUBLIC_INSTALL_URL_PREFIX = "/install/agent-witch";

/** When `1`, `build:agent-witch` writes tracked `public/install/agent-witch/app/*`. */
export const AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV =
  "AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE";

/** Gitignored output used by `pretest` / CI verify so pushes stay clean. */
export const AWI_VERIFY_INSTALL_BUNDLE_RELATIVE_PATH =
  ".cache/agent-witch-install-verify";

export const AWI_SHIPPED_APP_DIR_NAME = "app";

export const AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME = "agent-witch.js";

export const AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME = "deps.tar.gz";

export const AWI_SHIPPED_INSTALL_SHELL_FILE_NAME = "install.sh";

export const AWI_SHIPPED_ARTIFACTS = {
  mainScript: `${AWI_SHIPPED_APP_DIR_NAME}/${AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME}`,
  depsArchive: `${AWI_SHIPPED_APP_DIR_NAME}/${AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME}`,
  installShell: AWI_SHIPPED_INSTALL_SHELL_FILE_NAME,
} as const;

export type AgentWitchShippedArtifactKey = keyof typeof AWI_SHIPPED_ARTIFACTS;
