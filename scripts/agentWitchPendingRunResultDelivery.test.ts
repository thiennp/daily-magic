import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const completeAgentRunOnCloud = vi.fn();

vi.mock("./agentWitchCloudApi", () => ({
  completeAgentRunOnCloud: (...args: unknown[]) =>
    completeAgentRunOnCloud(...args),
}));

import {
  enqueueAgentRunCompletionOutbox,
  flushAgentRunCompletionOutbox,
  isAgentRunCompletionPosted,
} from "./agentWitchRunCompletionOutbox";
import {
  flushPendingRunResultDeliveries,
  persistPendingRunResultDelivery,
} from "./agentWitchPendingRunResultDelivery";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const tempRoot = path.join(
  os.tmpdir(),
  `agent-witch-pending-delivery-${process.pid}`,
);

const layout: AgentWitchLocalLayout = {
  profileEmail: "test@example.com",
  installDir: tempRoot,
  appDir: path.join(tempRoot, AGENT_WITCH_APP_DIR_NAME),
  appBundlePath: path.join(
    tempRoot,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  ),
  configPath: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "config.json",
  ),
  harnessRootDir: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "harness",
  ),
  harnessManifestPath: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "harness",
    "manifest.json",
  ),
  harnessSetsDir: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "harness",
    "sets",
  ),
  projectsDir: path.join(tempRoot, "profiles", "test@example.com", "projects"),
  projectDataDir: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "project-data",
  ),
  logsDir: path.join(tempRoot, "profiles", "test@example.com", "logs"),
  reportsDir: path.join(tempRoot, "profiles", "test@example.com", "reports"),
  deviceKeypairPath: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "device-keypair.json",
  ),
  mainLogPath: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "logs",
    "agent-witch.log",
  ),
  errorLogPath: path.join(
    tempRoot,
    "profiles",
    "test@example.com",
    "logs",
    "agent-witch-error.log",
  ),
};

describe("agentWitchPendingRunResultDelivery", () => {
  afterEach(() => {
    completeAgentRunOnCloud.mockReset();
    if (fs.existsSync(tempRoot)) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  it("replays pending terminal result frames on reconnect until cloud ack", async () => {
    const sent: Record<string, unknown>[] = [];
    persistPendingRunResultDelivery(layout, {
      runId: "run-reconnect-1",
      resultMessage: {
        type: "command.claude.result",
        payload: { agentRunId: "run-reconnect-1", exitCode: 1, output: "fail" },
      },
      terminalEndMessage: {
        type: "terminal.stream.end",
        payload: { runId: "run-reconnect-1" },
      },
      createdAt: new Date().toISOString(),
    });

    flushPendingRunResultDeliveries({
      layout,
      send: (message) => {
        sent.push(message);
      },
    });
    expect(sent).toHaveLength(2);

    enqueueAgentRunCompletionOutbox(layout, {
      runId: "run-reconnect-1",
      exitCode: 1,
      output: "fail",
      createdAt: new Date().toISOString(),
    });
    completeAgentRunOnCloud.mockResolvedValue(true);
    await flushAgentRunCompletionOutbox({
      layout,
      cloudApi: { appOrigin: "http://localhost:3000", pairingToken: "t" },
    });
    expect(isAgentRunCompletionPosted(layout, "run-reconnect-1")).toBe(true);

    sent.length = 0;
    flushPendingRunResultDeliveries({
      layout,
      send: (message) => {
        sent.push(message);
      },
    });
    expect(sent).toHaveLength(0);
  });
});
