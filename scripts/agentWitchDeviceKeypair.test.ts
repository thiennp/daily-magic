import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { loadOrCreateAgentWitchDeviceKeypair } from "./agentWitchDeviceKeypair";
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

const createLayout = (input: {
  readonly installDir: string;
  readonly profileEmail: string | null;
}): AgentWitchLocalLayout => {
  const profileDir =
    input.profileEmail === null
      ? input.installDir
      : path.join(input.installDir, "profiles", input.profileEmail);

  return {
    profileEmail: input.profileEmail,
    installDir: input.installDir,
    appDir: path.join(input.installDir, AGENT_WITCH_APP_DIR_NAME),
    appBundlePath: path.join(
      input.installDir,
      AGENT_WITCH_APP_DIR_NAME,
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    ),
    configPath: path.join(profileDir, "config.json"),
    harnessRootDir: path.join(profileDir, "harness"),
    harnessManifestPath: path.join(profileDir, "harness", "manifest.json"),
    harnessSetsDir: path.join(profileDir, "harness", "sets"),
    projectsDir: path.join(profileDir, "projects"),
    logsDir: path.join(profileDir, "logs"),
    reportsDir: path.join(profileDir, "reports"),
    deviceKeypairPath: path.join(profileDir, "device-keypair.json"),
    mainLogPath: path.join(profileDir, "logs", "agent-witch.log"),
    errorLogPath: path.join(profileDir, "logs", "agent-witch.error.log"),
  };
};

describe("agentWitchDeviceKeypair", () => {
  it("stores keypairs under each profile directory", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-keypair-"));
    tempDirs.push(installDir);

    const profileA = createLayout({
      installDir,
      profileEmail: "a@example.com",
    });
    const profileB = createLayout({
      installDir,
      profileEmail: "b@example.com",
    });

    const keypairA = loadOrCreateAgentWitchDeviceKeypair(profileA);
    const keypairB = loadOrCreateAgentWitchDeviceKeypair(profileB);

    expect(keypairA.publicKeyRaw).not.toBe(keypairB.publicKeyRaw);
    expect(fs.existsSync(profileA.deviceKeypairPath)).toBe(true);
    expect(fs.existsSync(profileB.deviceKeypairPath)).toBe(true);
    expect(fs.existsSync(path.join(installDir, "device-keypair.json"))).toBe(
      false,
    );
  });

  it("migrates a legacy install-root keypair into the active profile", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-keypair-"));
    tempDirs.push(installDir);
    const legacyPath = path.join(installDir, "device-keypair.json");
    const legacyKeypair = {
      publicKeyRaw: "legacy-public-key",
      privateKeyPem: "legacy-private-key",
    };
    fs.writeFileSync(legacyPath, JSON.stringify(legacyKeypair), {
      mode: 0o600,
    });

    const profileLayout = createLayout({
      installDir,
      profileEmail: "owner@example.com",
    });
    const loaded = loadOrCreateAgentWitchDeviceKeypair(profileLayout);

    expect(loaded).toEqual(legacyKeypair);
    expect(fs.existsSync(legacyPath)).toBe(false);
    expect(fs.existsSync(profileLayout.deviceKeypairPath)).toBe(true);
  });
});
