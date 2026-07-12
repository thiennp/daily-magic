import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const AGENT_WITCH_INSTALL_DIR_NAME = ".agent-witch";

export const AGENT_WITCH_PROFILES_DIR_NAME = "profiles";

export const AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME = "active-profile.json";

export const AGENT_WITCH_HARNESS_DIR_NAME = "harness";

export const AGENT_WITCH_HARNESS_SETS_DIR_NAME = "sets";

export const AGENT_WITCH_MANIFEST_FILE_NAME = "manifest.json";

export interface AgentWitchLocalLayout {
  readonly profileEmail: string | null;
  readonly installDir: string;
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

export const resolveAgentWitchInstallDir = (): string =>
  path.join(os.homedir(), AGENT_WITCH_INSTALL_DIR_NAME);

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
  if (profileEmailOverride !== undefined && profileEmailOverride !== null) {
    const trimmed = profileEmailOverride.trim();
    if (trimmed.length > 0) {
      return sanitizeProfileEmailForDir(trimmed);
    }
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
