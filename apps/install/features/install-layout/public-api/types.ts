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

/** Legacy names — prefer `AWI_INSTALL_ROOT_DIR_NAMES` for new code. */
export const AGENT_WITCH_PROD_INSTALL_DIR_NAME =
  AWI_INSTALL_ROOT_DIR_NAMES.production;
export const AGENT_WITCH_LOCAL_INSTALL_DIR_NAME =
  AWI_INSTALL_ROOT_DIR_NAMES.localhost;

/** @deprecated Prefer AGENT_WITCH_PROD_INSTALL_DIR_NAME */
export const AGENT_WITCH_INSTALL_DIR_NAME = AGENT_WITCH_PROD_INSTALL_DIR_NAME;

export const AGENT_WITCH_PROD_WAKE_PORT =
  AWI_INSTALL_ROOT_WAKE_PORTS.production;
export const AGENT_WITCH_LOCAL_WAKE_PORT =
  AWI_INSTALL_ROOT_WAKE_PORTS.localhost;

export const AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX =
  AWI_LAUNCH_AGENT_PREFIX.production;
export const AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX =
  AWI_LAUNCH_AGENT_PREFIX.localhost;

export const AGENT_WITCH_PROFILES_DIR_NAME = "profiles";

export const AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME =
  AWI_INSTALL_ROOT_FILES.activeProfile;

export const AGENT_WITCH_HARNESS_DIR_NAME = "harness";

export const AGENT_WITCH_HARNESS_SETS_DIR_NAME = "sets";

export const AGENT_WITCH_MANIFEST_FILE_NAME = "manifest.json";

export const AGENT_WITCH_PROJECTS_DIR_NAME =
  AGENT_WITCH_PROFILE_RELATIVE_PATHS.projectsDir;

export const AGENT_WITCH_LOGS_DIR_NAME =
  AGENT_WITCH_PROFILE_RELATIVE_PATHS.logsDir;

export const AGENT_WITCH_MAIN_LOG_FILE_NAME = "agent-witch.log";

export const AGENT_WITCH_ERROR_LOG_FILE_NAME = "agent-witch.error.log";

export const AGENT_WITCH_REPORTS_DIR_NAME =
  AGENT_WITCH_PROFILE_RELATIVE_PATHS.reportsDir;

export const AGENT_WITCH_DEVICE_KEYPAIR_FILE_NAME =
  AGENT_WITCH_PROFILE_RELATIVE_PATHS.deviceKeypairJson;

export const AGENT_WITCH_APP_DIR_NAME = AWI_BUNDLED_APP_DIR;

export const AGENT_WITCH_APP_BUNDLE_FILE_NAME = "agent-witch.js";

export interface AgentWitchAppHome {
  readonly installDirName: string;
  readonly wakePort: number;
  readonly launchAgentPrefix: string;
  readonly isLocalApp: boolean;
}

export interface AgentWitchLocalLayout {
  readonly profileEmail: string | null;
  readonly installDir: string;
  readonly appDir: string;
  readonly appBundlePath: string;
  readonly projectsDir: string;
  readonly logsDir: string;
  readonly mainLogPath: string;
  readonly errorLogPath: string;
  readonly reportsDir: string;
  readonly deviceKeypairPath: string;
  readonly configPath: string;
  readonly harnessRootDir: string;
  readonly harnessManifestPath: string;
  readonly harnessSetsDir: string;
}
