/**
 * Storybook browser shim — avoids AWI install-layout Node module (fileURLToPath at init).
 */
import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@agent-witch/install-layout/types";

const STORYBOOK_INSTALL_DIR = "/Users/storybook/.agent-witch";

export const isAgentWitchLocalInstallDir = (installDir: string): boolean =>
  installDir.endsWith(`/${AGENT_WITCH_LOCAL_INSTALL_DIR_NAME}`) ||
  installDir === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME;

export const resolveAgentWitchInstallDir = (): string => STORYBOOK_INSTALL_DIR;

export const resolveAgentWitchLaunchAgentPrefix = (
  installDir: string = STORYBOOK_INSTALL_DIR,
): string =>
  isAgentWitchLocalInstallDir(installDir)
    ? AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX
    : AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX;

export const resolveAgentWitchDefaultWakePort = (
  installDir: string = STORYBOOK_INSTALL_DIR,
): number =>
  isAgentWitchLocalInstallDir(installDir)
    ? AGENT_WITCH_LOCAL_WAKE_PORT
    : AGENT_WITCH_PROD_WAKE_PORT;

export const readActiveProfileEmailFromFile = (): string | null => null;

export const resolveActiveProfileEmailFromEnv = (): string | null => null;

export const resolveActiveProfileEmail = (): string | null => null;

export const resolveAgentWitchAppBundlePath = (): string =>
  `${STORYBOOK_INSTALL_DIR}/app/deps.tar.gz`;

export const resolveAgentWitchAppDir = (): string =>
  `${STORYBOOK_INSTALL_DIR}/app`;

export const resolveAgentWitchDeviceKeypairPath = (): string =>
  `${STORYBOOK_INSTALL_DIR}/device-keypair.json`;

export const resolveAgentWitchErrorLogPath = (): string =>
  `${STORYBOOK_INSTALL_DIR}/logs/agent-witch.error.log`;

export const resolveAgentWitchLogsDir = (): string =>
  `${STORYBOOK_INSTALL_DIR}/logs`;

export const resolveAgentWitchMainLogPath = (): string =>
  `${STORYBOOK_INSTALL_DIR}/logs/agent-witch.log`;

export const resolveAgentWitchProjectsDir = (): string =>
  `${STORYBOOK_INSTALL_DIR}/projects`;

export const resolveAgentWitchReportsDir = (): string =>
  `${STORYBOOK_INSTALL_DIR}/reports`;

export const sanitizeProfileEmailForDir = (email: string): string =>
  email.trim().toLowerCase();

export const sanitizeProfileEmailForLaunchAgentLabel = (
  email: string,
): string =>
  email
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gi, "-");

export const resolveAgentWitchLocalLayout = (): {
  readonly installDir: string;
  readonly profileEmail: string | null;
} => ({
  installDir: STORYBOOK_INSTALL_DIR,
  profileEmail: "storybook@agentwitch.com",
});

export const readAgentWitchWakePortFromFile = (): number | null => null;

export const resolveAgentWitchRuntimeWakePort = (): number =>
  AGENT_WITCH_PROD_WAKE_PORT;

export const resolveAgentWitchWakePortFromSources = (input: {
  readonly filePort: number | null;
  readonly envValue: string | undefined;
  readonly defaultPort: number;
}): number => input.filePort ?? input.defaultPort;
