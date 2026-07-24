import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_APP_DIR_NAME,
  AGENT_WITCH_BUNDLED_DEPS_DIR_NAME,
  AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
} from "../src/lib/agentWitch/agentWitchInstallApp.constant";

export const resolveAgentWitchBundledDepsArchivePath = (
  installDir: string,
): string =>
  path.join(
    installDir,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
  );

export const resolveAgentWitchBundledDepsDir = (installDir: string): string =>
  path.join(
    installDir,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_BUNDLED_DEPS_DIR_NAME,
  );

export const extractAgentWitchBundledDepsArchive = (
  installDir: string,
): void => {
  const appDir = path.join(installDir, AGENT_WITCH_APP_DIR_NAME);
  const archivePath = path.join(appDir, AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME);

  if (!fs.existsSync(archivePath)) {
    return;
  }

  fs.rmSync(resolveAgentWitchBundledDepsDir(installDir), {
    recursive: true,
    force: true,
  });
  fs.mkdirSync(appDir, { recursive: true });

  execFileSync("tar", ["-xzf", archivePath, "-C", appDir], {
    stdio: "pipe",
  });
  fs.rmSync(archivePath, { force: true });
};

export const removeLegacyAgentWitchNpmInstallArtifacts = (
  installDir: string,
): void => {
  fs.rmSync(path.join(installDir, "node_modules"), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(installDir, "package.json"), { force: true });
  fs.rmSync(path.join(installDir, "package-lock.json"), { force: true });
};
