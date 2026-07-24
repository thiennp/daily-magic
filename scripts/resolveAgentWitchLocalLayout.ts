import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirname = path.dirname(fileURLToPath(import.meta.url));

import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

export const AGENT_WITCH_PROD_INSTALL_DIR_NAME = ".agent-witch";
export const AGENT_WITCH_LOCAL_INSTALL_DIR_NAME = ".local-agent-witch";

/** @deprecated Prefer AGENT_WITCH_PROD_INSTALL_DIR_NAME */
export const AGENT_WITCH_INSTALL_DIR_NAME = AGENT_WITCH_PROD_INSTALL_DIR_NAME;

export const AGENT_WITCH_PROD_WAKE_PORT = 47892;
export const AGENT_WITCH_LOCAL_WAKE_PORT = 47893;

export const AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX = "com.agent-witch";
export const AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX = "com.local-agent-witch";

export const AGENT_WITCH_PROFILES_DIR_NAME = "profiles";

export const AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME = "active-profile.json";

export const AGENT_WITCH_HARNESS_DIR_NAME = "harness";

export const AGENT_WITCH_HARNESS_SETS_DIR_NAME = "sets";

export const AGENT_WITCH_MANIFEST_FILE_NAME = "manifest.json";

export interface AgentWitchLocalLayout {
  readonly profileEmail: string | null;
  readonly installDir: string;
  readonly appDir: string;
  readonly appBundlePath: string;
  readonly configPath: string;
  readonly harnessRootDir: string;
  readonly harnessManifestPath: string;
  readonly harnessSetsDir: string;
}

export const sanitizeProfileEmailForDir = (email: string): string =>
  email.trim().toLowerCase();

export const sanitizeProfileEmailForLaunchAgentLabel = (
  email: string,
): string =>
  sanitizeProfileEmailForDir(email)
    .replace(/@/g, "-at-")
    .replace(/\./g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const resolveAgentWitchInstallDir = (): string => {
  const fromEnv = process.env.AGENT_WITCH_HOME?.trim();
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return path.resolve(fromEnv);
  }

  const candidate = path.resolve(moduleDirname);
  const baseName = path.basename(candidate);
  const parentName = path.basename(path.dirname(candidate));

  if (
    baseName === AGENT_WITCH_APP_DIR_NAME &&
    (parentName === AGENT_WITCH_PROD_INSTALL_DIR_NAME ||
      parentName === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME)
  ) {
    return path.dirname(candidate);
  }

  if (
    baseName === AGENT_WITCH_PROD_INSTALL_DIR_NAME ||
    baseName === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME
  ) {
    return candidate;
  }

  return path.join(os.homedir(), AGENT_WITCH_PROD_INSTALL_DIR_NAME);
};

export const resolveAgentWitchAppDir = (
  installDir: string = resolveAgentWitchInstallDir(),
): string => path.join(installDir, AGENT_WITCH_APP_DIR_NAME);

export const resolveAgentWitchAppBundlePath = (
  installDir: string = resolveAgentWitchInstallDir(),
): string =>
  path.join(
    resolveAgentWitchAppDir(installDir),
    AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  );

export const isAgentWitchLocalInstallDir = (installDir: string): boolean =>
  path.basename(installDir) === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME;

export const resolveAgentWitchLaunchAgentPrefix = (
  installDir: string = resolveAgentWitchInstallDir(),
): string =>
  isAgentWitchLocalInstallDir(installDir)
    ? AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX
    : AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX;

export const resolveAgentWitchDefaultWakePort = (
  installDir: string = resolveAgentWitchInstallDir(),
): number =>
  isAgentWitchLocalInstallDir(installDir)
    ? AGENT_WITCH_LOCAL_WAKE_PORT
    : AGENT_WITCH_PROD_WAKE_PORT;

export const resolveActiveProfileEmailFromEnv = (): string | null => {
  const fromProfile = process.env.AGENT_WITCH_PROFILE?.trim();
  if (fromProfile !== undefined && fromProfile.length > 0) {
    return sanitizeProfileEmailForDir(fromProfile);
  }

  const fromEmail = process.env.AGENT_WITCH_EMAIL?.trim();
  if (fromEmail !== undefined && fromEmail.length > 0) {
    return sanitizeProfileEmailForDir(fromEmail);
  }

  return null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readActiveProfileEmailFromFile = (
  installDir: string = resolveAgentWitchInstallDir(),
): string | null => {
  const activeProfilePath = path.join(
    installDir,
    AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME,
  );

  if (!fs.existsSync(activeProfilePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(activeProfilePath, "utf8"),
    );
    if (
      isRecord(parsed) &&
      typeof parsed.email === "string" &&
      parsed.email.trim().length > 0
    ) {
      return sanitizeProfileEmailForDir(parsed.email);
    }
  } catch {
    return null;
  }

  return null;
};

export const resolveActiveProfileEmail = (
  profileEmailOverride?: string | null,
): string | null => {
  if (profileEmailOverride !== undefined) {
    if (profileEmailOverride === null) {
      return null;
    }

    const trimmed = profileEmailOverride.trim();
    if (trimmed.length > 0) {
      return sanitizeProfileEmailForDir(trimmed);
    }

    return null;
  }

  const fromEnv = resolveActiveProfileEmailFromEnv();
  if (fromEnv !== null) {
    return fromEnv;
  }

  return readActiveProfileEmailFromFile();
};

export const resolveAgentWitchLocalLayout = (
  profileEmailOverride?: string | null,
): AgentWitchLocalLayout => {
  const installDir = resolveAgentWitchInstallDir();
  const appDir = resolveAgentWitchAppDir(installDir);
  const appBundlePath = resolveAgentWitchAppBundlePath(installDir);
  const profileEmail = resolveActiveProfileEmail(profileEmailOverride);

  if (profileEmail !== null) {
    const profileDir = path.join(
      installDir,
      AGENT_WITCH_PROFILES_DIR_NAME,
      profileEmail,
    );
    const harnessRootDir = path.join(profileDir, AGENT_WITCH_HARNESS_DIR_NAME);

    return {
      profileEmail,
      installDir,
      appDir,
      appBundlePath,
      configPath: path.join(profileDir, "config.json"),
      harnessRootDir,
      harnessManifestPath: path.join(
        harnessRootDir,
        AGENT_WITCH_MANIFEST_FILE_NAME,
      ),
      harnessSetsDir: path.join(
        harnessRootDir,
        AGENT_WITCH_HARNESS_SETS_DIR_NAME,
      ),
    };
  }

  const harnessRootDir = path.join(installDir, AGENT_WITCH_HARNESS_DIR_NAME);

  return {
    profileEmail: null,
    installDir,
    appDir,
    appBundlePath,
    configPath: path.join(installDir, "config.json"),
    harnessRootDir,
    harnessManifestPath: path.join(
      harnessRootDir,
      AGENT_WITCH_MANIFEST_FILE_NAME,
    ),
    harnessSetsDir: path.join(
      harnessRootDir,
      AGENT_WITCH_HARNESS_SETS_DIR_NAME,
    ),
  };
};
