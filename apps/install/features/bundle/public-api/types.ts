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
export const AGENT_WITCH_INSTALL_BUNDLE_VERSION = "289";

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
