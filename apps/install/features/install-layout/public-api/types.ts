/**
 * Install roots and profile-relative paths (contract).
 * Canonical on-disk detail: src/features/agent-witch/LOCAL_INSTALL_LAYOUT.md
 */

export const AWI_INSTALL_ROOT_DIR_NAMES = {
  production: ".agent-witch",
  localhost: ".local-agent-witch",
} as const;

export type AgentWitchInstallRootKind = keyof typeof AWI_INSTALL_ROOT_DIR_NAMES;

export const AWI_INSTALL_ROOT_WAKE_PORTS: Record<
  AgentWitchInstallRootKind,
  number
> = {
  production: 47892,
  localhost: 47893,
};

export const AWI_LAUNCH_AGENT_PREFIX: Record<
  AgentWitchInstallRootKind,
  string
> = {
  production: "com.agent-witch",
  localhost: "com.local-agent-witch",
};

/** Install-wide metadata files at the install root (multi-profile layout). */
export const AWI_INSTALL_ROOT_FILES = {
  activeProfile: "active-profile.json",
  installVersion: "install-version.json",
  wakePort: "wake-port.json",
  linkCode: "link-code.txt",
  watchdogReinstallState: "watchdog-reinstall-state.json",
} as const;

/** Shared app binaries under `<installRoot>/app/`. */
export const AWI_BUNDLED_APP_DIR = "app";

export const AWI_BUNDLED_APP_ENTRY = `${AWI_BUNDLED_APP_DIR}/agent-witch.js`;

export const AWI_BUNDLED_COMMAND_DIR = `${AWI_BUNDLED_APP_DIR}/command`;

/** Per-profile tree under `<installRoot>/profiles/<email>/`. */
export interface AgentWitchProfileRelativePaths {
  readonly configJson: "config.json";
  readonly deviceKeypairJson: "device-keypair.json";
  readonly connectionHealthJson: "connection-health.json";
  readonly writerApiSecretsJson: "writer-api-secrets.json";
  readonly automationsJson: "automations.json";
  readonly pendingRunInputsJson: "pending-run-inputs.json";
  readonly runCompletionOutboxJson: "run-completion-outbox.json";
  readonly logsDir: "logs";
  readonly reportsDir: "reports";
  readonly runsDir: "runs";
  readonly projectsDir: "projects";
  readonly harnessDir: "harness";
}

export const AGENT_WITCH_PROFILE_RELATIVE_PATHS: AgentWitchProfileRelativePaths =
  {
    configJson: "config.json",
    deviceKeypairJson: "device-keypair.json",
    connectionHealthJson: "connection-health.json",
    writerApiSecretsJson: "writer-api-secrets.json",
    automationsJson: "automations.json",
    pendingRunInputsJson: "pending-run-inputs.json",
    runCompletionOutboxJson: "run-completion-outbox.json",
    logsDir: "logs",
    reportsDir: "reports",
    runsDir: "runs",
    projectsDir: "projects",
    harnessDir: "harness",
  };

export const profileDirForEmail = (sanitizedEmail: string): string =>
  `profiles/${sanitizedEmail}`;
