import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
} from "@agent-witch/install-bundle/types";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  beginAgentWitchWriterWork,
  endAgentWitchWriterWork,
  isAgentWitchWriterWorkInProgress,
  readAgentWitchWriterWorkState,
  resolveAgentWitchWriterWorkStatePath,
  subscribeAgentWitchWriterWorkIdle,
} from "./agentWitchWriterWorkGuard";

const createTempLayout = (): AgentWitchLocalLayout => {
  const installDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-writer-work-"),
  );
  const profileEmail = "user@example.com";
  return {
    profileEmail,
    installDir,
    appDir: path.join(installDir, AWI_SHIPPED_APP_DIR_NAME),
    appBundlePath: path.join(
      installDir,
      AWI_SHIPPED_APP_DIR_NAME,
      AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
    ),
    configPath: path.join(installDir, "profiles", profileEmail, "config.json"),
    harnessRootDir: path.join(installDir, "profiles", profileEmail, "harness"),
    harnessManifestPath: path.join(
      installDir,
      "profiles",
      profileEmail,
      "harness",
      "manifest.json",
    ),
    harnessSetsDir: path.join(
      installDir,
      "profiles",
      profileEmail,
      "harness",
      "sets",
    ),
    projectsDir: path.join(installDir, "profiles", profileEmail, "projects"),
    logsDir: path.join(installDir, "profiles", profileEmail, "logs"),
    reportsDir: path.join(installDir, "profiles", profileEmail, "reports"),
    deviceKeypairPath: path.join(
      installDir,
      "profiles",
      profileEmail,
      "device-keypair.json",
    ),
    mainLogPath: path.join(
      installDir,
      "profiles",
      profileEmail,
      "logs",
      "agent-witch.log",
    ),
    errorLogPath: path.join(
      installDir,
      "profiles",
      profileEmail,
      "logs",
      "agent-witch.error.log",
    ),
  };
};

describe("agentWitchWriterWorkGuard", () => {
  const layouts: AgentWitchLocalLayout[] = [];

  afterEach(() => {
    for (const layout of layouts) {
      fs.rmSync(layout.installDir, { recursive: true, force: true });
    }
    layouts.length = 0;
  });

  it("tracks active writer work on disk for watchdog consumers", () => {
    const layout = createTempLayout();
    layouts.push(layout);

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    beginAgentWitchWriterWork(layout);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(1);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
    expect(fs.existsSync(resolveAgentWitchWriterWorkStatePath(layout))).toBe(
      true,
    );

    endAgentWitchWriterWork(layout);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
  });

  it("notifies idle listeners when the last writer task completes", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    const idle = vi.fn();

    subscribeAgentWitchWriterWorkIdle(idle);
    beginAgentWitchWriterWork(layout);
    endAgentWitchWriterWork(layout);

    expect(idle).toHaveBeenCalledTimes(1);
  });
});
