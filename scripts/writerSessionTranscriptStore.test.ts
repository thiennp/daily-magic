import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  appendWriterTranscriptTurn,
  endActiveWriterTranscriptSession,
  loadWriterSessionCanonical,
  resolveActiveWriterSessionId,
  startNewWriterTranscriptSession,
} from "@agent-witch/live-memory";
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

const buildTempLayout = (): AgentWitchLocalLayout => {
  const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-transcript-"));
  tempDirs.push(installDir);
  return {
    installDir,
    appDir: path.join(installDir, AGENT_WITCH_APP_DIR_NAME),
    appBundlePath: path.join(
      installDir,
      AGENT_WITCH_APP_DIR_NAME,
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    ),
    profileEmail: null,
    configPath: path.join(installDir, "config.json"),
    harnessRootDir: path.join(installDir, "harness"),
    harnessManifestPath: path.join(installDir, "harness", "manifest.json"),
    harnessSetsDir: path.join(installDir, "harness", "sets"),
    projectsDir: path.join(installDir, "projects"),
    logsDir: path.join(installDir, "logs"),
    reportsDir: path.join(installDir, "reports"),
    deviceKeypairPath: path.join(installDir, "device-keypair.json"),
    mainLogPath: path.join(installDir, "logs", "agent-witch.log"),
    errorLogPath: path.join(installDir, "logs", "agent-witch.error.log"),
  };
};

describe("writerSessionTranscriptStore", () => {
  it("appends turns to the active session and rebuilds continuation", () => {
    const layout = buildTempLayout();
    const sessionId = startNewWriterTranscriptSession(
      layout,
      "cursor",
      "/tmp/project",
    );

    appendWriterTranscriptTurn({
      layout,
      writerAgent: "cursor",
      projectFolderPath: "/tmp/project",
      userPrompt: "Hello",
      assistantOutput: "Hi there",
      agentRunId: "run-1",
    });

    const canonical = loadWriterSessionCanonical(layout, sessionId);
    expect(canonical?.turns).toHaveLength(1);
    expect(canonical?.turns[0]?.userPrompt).toBe("Hello");

    expect(resolveActiveWriterSessionId(layout, "cursor", "/tmp/project")).toBe(
      sessionId,
    );

    endActiveWriterTranscriptSession(layout, "cursor");
    expect(
      resolveActiveWriterSessionId(layout, "cursor", "/tmp/project"),
    ).toBeNull();
  });
});
