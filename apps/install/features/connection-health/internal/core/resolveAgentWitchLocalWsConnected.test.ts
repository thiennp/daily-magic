import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
} from "@agent-witch/install-bundle/types";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { writeAgentWitchConnectionHealth } from "./agentWitchConnectionHealth";
import { resolveAgentWitchLocalWsConnected } from "./resolveAgentWitchLocalWsConnected";

const tempDirs: string[] = [];

const createLayout = (rootDir: string): AgentWitchLocalLayout => ({
  profileEmail: null,
  installDir: rootDir,
  appDir: path.join(rootDir, AWI_SHIPPED_APP_DIR_NAME),
  appBundlePath: path.join(
    rootDir,
    AWI_SHIPPED_APP_DIR_NAME,
    AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
  ),
  configPath: path.join(rootDir, "config.json"),
  harnessRootDir: path.join(rootDir, "harness"),
  harnessManifestPath: path.join(rootDir, "harness", "manifest.json"),
  harnessSetsDir: path.join(rootDir, "harness", "sets"),
  projectsDir: path.join(rootDir, "projects"),
  logsDir: path.join(rootDir, "logs"),
  reportsDir: path.join(rootDir, "reports"),
  deviceKeypairPath: path.join(rootDir, "device-keypair.json"),
  mainLogPath: path.join(rootDir, "logs", "agent-witch.log"),
  errorLogPath: path.join(rootDir, "logs", "agent-witch.error.log"),
});

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("resolveAgentWitchLocalWsConnected", () => {
  it("is false when the socket is closed even if health exists", () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-ws-conn-"));
    tempDirs.push(rootDir);
    const layout = createLayout(rootDir);
    writeAgentWitchConnectionHealth(layout, {
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    });

    expect(
      resolveAgentWitchLocalWsConnected(layout, { socketOpen: false }),
    ).toBe(false);
  });

  it("is false when the socket is open but cloud has not acked yet", () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-ws-conn-"));
    tempDirs.push(rootDir);
    const layout = createLayout(rootDir);

    expect(
      resolveAgentWitchLocalWsConnected(layout, { socketOpen: true }),
    ).toBe(false);
  });

  it("is true when the socket is open and health is fresh", () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-ws-conn-"));
    tempDirs.push(rootDir);
    const layout = createLayout(rootDir);
    writeAgentWitchConnectionHealth(layout, {
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    });

    expect(
      resolveAgentWitchLocalWsConnected(layout, { socketOpen: true }),
    ).toBe(true);
  });
});
