import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS,
  countAgentWitchBusyTasks,
  shouldRestartForBundleUpdateNow,
} from "./agentWitchBundleRestartGate";
import {
  listPendingRunInputSessions,
  savePendingRunInputSession,
} from "./agentWitchPendingRunSessions";
import { AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME } from "./agentWitchWriterWorkGuard";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

describe("shouldRestartForBundleUpdateNow", () => {
  it("restarts immediately when idle", () => {
    expect(
      shouldRestartForBundleUpdateNow({ busyTaskCount: 0, waitedMs: 0 }),
    ).toBe(true);
  });

  it("waits while tasks run within the bounded wait", () => {
    expect(
      shouldRestartForBundleUpdateNow({ busyTaskCount: 2, waitedMs: 1000 }),
    ).toBe(false);
  });

  it("restarts once the max wait has elapsed", () => {
    expect(
      shouldRestartForBundleUpdateNow({
        busyTaskCount: 1,
        waitedMs: AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS,
      }),
    ).toBe(true);
  });
});

describe("countAgentWitchBusyTasks (b53ecc47)", () => {
  const makeInstall = (): string => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "awi-gate-"));
    fs.mkdirSync(path.join(installDir, "profiles", "a@b.c"), {
      recursive: true,
    });
    return installDir;
  };
  const writeWork = (profileDir: string, ids: readonly string[]): void => {
    const entries = ids.map((id) => ({
      id,
      ownerPid: process.pid,
      startedAt: new Date().toISOString(),
      inProcess: true,
    }));
    fs.writeFileSync(
      path.join(profileDir, AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME),
      JSON.stringify({
        activeCount: entries.length,
        updatedAt: new Date().toISOString(),
        ownerPid: process.pid,
        entries,
      }),
    );
  };

  it("Testi recheck c3beb5fb: a run parked on an answer does not hold the update", () => {
    const installDir = makeInstall();
    const layout = {
      installDir,
      profileEmail: "a@b.c",
    } as AgentWitchLocalLayout;
    savePendingRunInputSession(layout, {
      agentRunId: "paused-run",
      originalPrompt: "p",
      partialOutput: "",
      question: "Which repo?",
      accumulatedOutput: "",
      savedAt: new Date().toISOString(),
    });
    expect(countAgentWitchBusyTasks(installDir)).toBe(0);
    // The parked question is still on disk for the next host to replay.
    expect(listPendingRunInputSessions(layout)).toHaveLength(1);
  });

  it("a live writer task still holds it, a parked one with a stale entry does not", () => {
    const installDir = makeInstall();
    const profileDir = path.join(installDir, "profiles", "a@b.c");
    const layout = {
      installDir,
      profileEmail: "a@b.c",
    } as AgentWitchLocalLayout;
    savePendingRunInputSession(layout, {
      agentRunId: "paused-run",
      originalPrompt: "p",
      partialOutput: "",
      question: "Which repo?",
      accumulatedOutput: "",
    });
    writeWork(profileDir, ["paused-run", "live-run"]);
    expect(countAgentWitchBusyTasks(installDir)).toBe(1);
  });
});
