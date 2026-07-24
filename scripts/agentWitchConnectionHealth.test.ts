import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  resolveAgentWitchConnectionHealthPath,
  writeAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";
import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const tempDirs: string[] = [];

const createLayout = (rootDir: string): AgentWitchLocalLayout => ({
  profileEmail: "user@example.com",
  installDir: rootDir,
  appDir: path.join(rootDir, AGENT_WITCH_APP_DIR_NAME),
  appBundlePath: path.join(
    rootDir,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  ),
  configPath: path.join(rootDir, "profiles", "user@example.com", "config.json"),
  harnessRootDir: path.join(rootDir, "profiles", "user@example.com", "harness"),
  harnessManifestPath: path.join(
    rootDir,
    "profiles",
    "user@example.com",
    "harness",
    "manifest.json",
  ),
  harnessSetsDir: path.join(
    rootDir,
    "profiles",
    "user@example.com",
    "harness",
    "sets",
  ),
  projectsDir: path.join(rootDir, "profiles", "user@example.com", "projects"),
  logsDir: path.join(rootDir, "profiles", "user@example.com", "logs"),
  reportsDir: path.join(rootDir, "profiles", "user@example.com", "reports"),
});

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("agentWitchConnectionHealth", () => {
  it("writes and reads connection health for a profile", () => {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-health-"));
    tempDirs.push(rootDir);
    const layout = createLayout(rootDir);

    writeAgentWitchConnectionHealth(layout, {
      wsUrl: "ws://localhost:3000/api/agent-witch/ws",
    });

    const healthPath = resolveAgentWitchConnectionHealthPath(layout);
    expect(fs.existsSync(healthPath)).toBe(true);
    expect(readAgentWitchConnectionHealth(layout)).toMatchObject({
      wsUrl: "ws://localhost:3000/api/agent-witch/ws",
      lastAckAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
    });
  });

  it("marks missing or old health as stale", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchConnectionHealthStale(
        null,
        AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      ),
    ).toBe(true);
    expect(
      isAgentWitchConnectionHealthStale(
        {
          lastAckAt: "2026-01-01T11:57:59.000Z",
          wsUrl: null,
          connectedAt: null,
        },
        AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      ),
    ).toBe(true);
    expect(
      isAgentWitchConnectionHealthStale(
        {
          lastAckAt: "2026-01-01T11:58:01.000Z",
          wsUrl: null,
          connectedAt: null,
        },
        AGENT_WITCH_CONNECTION_STALE_MS,
        nowMs,
      ),
    ).toBe(false);
  });
});
