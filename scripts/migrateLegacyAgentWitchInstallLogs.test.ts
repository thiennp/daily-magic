import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { migrateLegacyAgentWitchInstallLogs } from "./migrateLegacyAgentWitchInstallLogs";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const createProfileLayout = (
  installDir: string,
  profileEmail: string,
): AgentWitchLocalLayout => {
  const profileDir = path.join(installDir, "profiles", profileEmail);

  return {
    profileEmail,
    installDir,
    appDir: path.join(installDir, AGENT_WITCH_APP_DIR_NAME),
    appBundlePath: path.join(
      installDir,
      AGENT_WITCH_APP_DIR_NAME,
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    ),
    configPath: path.join(profileDir, "config.json"),
    harnessRootDir: path.join(profileDir, "harness"),
    harnessManifestPath: path.join(profileDir, "harness", "manifest.json"),
    harnessSetsDir: path.join(profileDir, "harness", "sets"),
    projectsDir: path.join(profileDir, "projects"),
    logsDir: path.join(profileDir, "logs"),
    mainLogPath: path.join(profileDir, "logs", "agent-witch.log"),
    errorLogPath: path.join(profileDir, "logs", "agent-witch.error.log"),
    reportsDir: path.join(profileDir, "reports"),
    deviceKeypairPath: path.join(profileDir, "device-keypair.json"),
  };
};

describe("migrateLegacyAgentWitchInstallLogs", () => {
  it("moves install-root stdout/stderr logs into the active profile", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-log-migrate-"),
    );
    tempDirs.push(installDir);
    const layout = createProfileLayout(installDir, "owner@example.com");
    const legacyLogsDir = path.join(installDir, "logs");
    fs.mkdirSync(legacyLogsDir, { recursive: true });
    fs.writeFileSync(path.join(legacyLogsDir, "agent-witch.log"), "stdout\n");
    fs.writeFileSync(
      path.join(legacyLogsDir, "agent-witch.error.log"),
      "stderr\n",
    );

    migrateLegacyAgentWitchInstallLogs(layout);

    expect(fs.readFileSync(layout.mainLogPath, "utf8")).toBe("stdout\n");
    expect(fs.readFileSync(layout.errorLogPath, "utf8")).toBe("stderr\n");
    expect(fs.existsSync(path.join(legacyLogsDir, "agent-witch.log"))).toBe(
      false,
    );
  });
});
