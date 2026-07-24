import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  enqueueAgentRunCompletionOutbox,
  flushAgentRunCompletionOutbox,
} from "./agentWitchRunCompletionOutbox";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const completeAgentRunOnCloud = vi.fn();

vi.mock("./agentWitchCloudApi", () => ({
  completeAgentRunOnCloud: (...args: unknown[]) =>
    completeAgentRunOnCloud(...args),
}));

const tempRoot = path.join(
  os.tmpdir(),
  `agent-witch-outbox-test-${process.pid}`,
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
  logsDir: path.join(tempRoot, "profiles", "test@example.com", "logs"),
  reportsDir: path.join(tempRoot, "profiles", "test@example.com", "reports"),
};

const cloudApi = {
  appOrigin: "https://app.example.com",
  pairingToken: "pair-token",
};

describe("agentWitchRunCompletionOutbox (AGENT-039)", () => {
  afterEach(() => {
    completeAgentRunOnCloud.mockReset();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("persists and dedupes completion entries by run id", () => {
    enqueueAgentRunCompletionOutbox(layout, {
      runId: "run-1",
      exitCode: 0,
      output: "first",
      createdAt: "2026-07-19T10:00:00.000Z",
    });
    enqueueAgentRunCompletionOutbox(layout, {
      runId: "run-1",
      exitCode: 1,
      output: "second",
      createdAt: "2026-07-19T10:01:00.000Z",
    });

    const outboxPath = path.join(
      tempRoot,
      "profiles",
      "test@example.com",
      "run-completion-outbox.json",
    );
    const parsed = JSON.parse(fs.readFileSync(outboxPath, "utf8")) as Array<{
      runId: string;
      output: string;
    }>;

    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.output).toBe("second");
  });

  it("flushes successful completions and keeps failed entries", async () => {
    enqueueAgentRunCompletionOutbox(layout, {
      runId: "run-ok",
      exitCode: 0,
      output: "done",
      createdAt: "2026-07-19T10:00:00.000Z",
    });
    enqueueAgentRunCompletionOutbox(layout, {
      runId: "run-fail",
      exitCode: 1,
      output: "retry me",
      createdAt: "2026-07-19T10:00:00.000Z",
    });

    completeAgentRunOnCloud.mockImplementation(
      async (_config: unknown, runId: string) => runId === "run-ok",
    );

    await flushAgentRunCompletionOutbox({ layout, cloudApi });

    expect(completeAgentRunOnCloud).toHaveBeenCalledTimes(2);

    const outboxPath = path.join(
      tempRoot,
      "profiles",
      "test@example.com",
      "run-completion-outbox.json",
    );
    const remaining = JSON.parse(fs.readFileSync(outboxPath, "utf8")) as Array<{
      runId: string;
    }>;

    expect(remaining).toEqual([expect.objectContaining({ runId: "run-fail" })]);
  });
});
