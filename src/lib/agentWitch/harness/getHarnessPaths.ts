import path from "node:path";

import {
  HARNESS_MANIFEST_FILE_NAME,
  HARNESS_ROOT_DIR_NAME,
  HARNESS_SETS_DIR_NAME,
} from "./constants";

const sanitizeProfileEmailForDir = (email: string): string =>
  email.trim().toLowerCase();

export const getAgentWitchInstallDir = (): string =>
  path.join(process.env.HOME ?? "", ".agent-witch");

export const getHarnessRootDir = (profileEmail?: string | null): string => {
  const installDir = getAgentWitchInstallDir();

  if (profileEmail !== undefined && profileEmail !== null) {
    const normalizedEmail = sanitizeProfileEmailForDir(profileEmail);
    if (normalizedEmail.length > 0) {
      return path.join(
        installDir,
        "profiles",
        normalizedEmail,
        HARNESS_ROOT_DIR_NAME,
      );
    }
  }

  return path.join(installDir, HARNESS_ROOT_DIR_NAME);
};

export const getHarnessSetsDir = (profileEmail?: string | null): string =>
  path.join(getHarnessRootDir(profileEmail), HARNESS_SETS_DIR_NAME);

export const getHarnessManifestPath = (profileEmail?: string | null): string =>
  path.join(getHarnessRootDir(profileEmail), HARNESS_MANIFEST_FILE_NAME);

export const getHarnessSetDir = (
  slug: string,
  profileEmail?: string | null,
): string => path.join(getHarnessSetsDir(profileEmail), slug);
