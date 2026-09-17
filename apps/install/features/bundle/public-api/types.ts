/**
 * Shipped install bundle metadata (contract).
 * Runtime version today: src/lib/agentWitch/agentWitchInstallBundleVersion.ts
 */

/** Bump when any install bundle artifact changes (shell, JS, deps). */
export const AWI_INSTALL_BUNDLE_VERSION_CANONICAL_KEY =
  "AGENT_WITCH_INSTALL_BUNDLE_VERSION";

/** Written to `<installRoot>/install-version.json` after install/update. */
export interface AgentWitchInstallVersionFile {
  readonly bundleVersion: string;
  readonly appOrigin?: string;
  readonly installedAt?: string;
}

export const AWI_INSTALL_VERSION_FILENAME = "install-version.json";

/** HTTP path segment AWC serves for the curl | bash installer. */
export const AWI_PUBLIC_INSTALL_URL_PREFIX = "/install/agent-witch";

export const AWI_SHIPPED_ARTIFACTS = {
  mainScript: "app/agent-witch.js",
  depsArchive: "app/deps.tar.gz",
  installShell: "install.sh",
} as const;

export type AgentWitchShippedArtifactKey = keyof typeof AWI_SHIPPED_ARTIFACTS;
