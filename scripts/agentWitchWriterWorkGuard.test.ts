import { spawnSync } from "node:child_process";
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
  AGENT_WITCH_WRITER_WORK_STALE_MS,
  beginAgentWitchWriterWork,
  endAgentWitchWriterWork,
  isAgentWitchWriterWorkInProgress,
  isAgentWitchWriterWorkStateStale,
  readAgentWitchWriterWorkState,
  registerAgentWitchWriterWorkPid,
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
    projectDataDir: path.join(
      installDir,
      "profiles",
      profileEmail,
      "project-data",
    ),
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

describe("agentWitchWriterWorkGuard staleness", () => {
  const layouts: AgentWitchLocalLayout[] = [];

  afterEach(() => {
    for (const layout of layouts) {
      fs.rmSync(layout.installDir, { recursive: true, force: true });
    }
    layouts.length = 0;
  });

  const writeState = (
    layout: AgentWitchLocalLayout,
    state: Record<string, unknown>,
  ): void => {
    const statePath = resolveAgentWitchWriterWorkStatePath(layout);
    fs.mkdirSync(path.dirname(statePath), { recursive: true });
    fs.writeFileSync(statePath, JSON.stringify(state), "utf8");
  };

  const deadPid = (): number => {
    const child = spawnSync(process.execPath, ["-e", ""]);
    return child.pid ?? 0;
  };

  it("treats a legacy counter older than the stale window as not in progress and resets it", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 2,
      updatedAt: new Date(
        Date.now() - AGENT_WITCH_WRITER_WORK_STALE_MS - 60_000,
      ).toISOString(),
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(0);
  });

  it("treats a fresh legacy counter (no ownerPid, no entries) as idle and heals it", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(0);
  });

  it("treats a fresh counter owned by a dead process as not in progress", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: deadPid(),
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(0);
  });

  it("treats a fresh counter owned by a live process but without entries as idle and heals it", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
    });

    // Without entries, activeCount > 0 is treated as legacy and healed
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(0);
  });

  it("does not let begin/end inherit a stale leaked count", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 2,
      updatedAt: "2026-09-22T08:33:35.724Z",
    });
    const idle = vi.fn();
    const unsubscribe = subscribeAgentWitchWriterWorkIdle(idle);

    beginAgentWitchWriterWork(layout);
    expect(readAgentWitchWriterWorkState(layout)).toMatchObject({
      activeCount: 1,
      ownerPid: process.pid,
    });
    endAgentWitchWriterWork(layout);
    unsubscribe();

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(idle).toHaveBeenCalledTimes(1);
  });

  it("isAgentWitchWriterWorkStateStale covers the decision table", () => {
    const nowMs = Date.parse("2026-10-06T00:00:00.000Z");
    const fresh = new Date(nowMs - 60_000).toISOString();
    const old = new Date(
      nowMs - AGENT_WITCH_WRITER_WORK_STALE_MS - 1,
    ).toISOString();
    const alive = { nowMs, isPidAlive: () => true };
    const dead = { nowMs, isPidAlive: () => false };

    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 0, updatedAt: old },
        alive,
      ),
    ).toBe(false);
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: fresh },
        alive,
      ),
    ).toBe(true); // healed because no entries
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: old },
        alive,
      ),
    ).toBe(true);
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: fresh, ownerPid: 4242 },
        dead,
      ),
    ).toBe(true);
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: fresh, ownerPid: 4242 },
        alive,
      ),
    ).toBe(true); // healed because no entries
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: "not-a-date" },
        alive,
      ),
    ).toBe(true);
  });
});

describe("agentWitchWriterWorkGuard new entries logic", () => {
  const layouts: AgentWitchLocalLayout[] = [];

  afterEach(() => {
    for (const layout of layouts) {
      fs.rmSync(layout.installDir, { recursive: true, force: true });
    }
    layouts.length = 0;
  });

  const writeState = (
    layout: AgentWitchLocalLayout,
    state: Record<string, unknown>,
  ) => {
    const statePath = resolveAgentWitchWriterWorkStatePath(layout);
    fs.mkdirSync(path.dirname(statePath), { recursive: true });
    fs.writeFileSync(statePath, JSON.stringify(state), "utf8");
  };

  it("busy within pre-spawn window with no pid, and idle after the window", () => {
    const layout = createTempLayout();
    layouts.push(layout);

    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
      entries: [
        {
          id: "test-1",
          ownerPid: process.pid,
          startedAt: new Date().toISOString(),
        },
      ],
    });

    // Busy within pre-spawn
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);

    // Idle after window
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
      entries: [
        {
          id: "test-1",
          ownerPid: process.pid,
          startedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        },
      ],
    });
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
  });

  it("busy while registered pid alive, idle when registered pid dead", () => {
    const layout = createTempLayout();
    layouts.push(layout);

    const alivePid = process.pid;
    const deadPid = spawnSync(process.execPath, ["-e", ""]).pid;

    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
      entries: [
        {
          id: "test-1",
          ownerPid: process.pid,
          startedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
          childPid: alivePid,
        },
      ],
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);

    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
      entries: [
        {
          id: "test-1",
          ownerPid: process.pid,
          startedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
          childPid: deadPid,
        },
      ],
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
  });

  it("end by id", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    const id = beginAgentWitchWriterWork(layout);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
    endAgentWitchWriterWork(layout, id);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
  });

  it("inProcess entry busy until ended", () => {
    const layout = createTempLayout();
    layouts.push(layout);

    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
      entries: [
        {
          id: "test-1",
          ownerPid: process.pid,
          startedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
          inProcess: true,
        },
      ],
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
  });

  it("a run parked for input (child gone, work ended) no longer blocks updates", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    const onIdle = vi.fn();
    const unsubscribe = subscribeAgentWitchWriterWorkIdle(onIdle);
    const id = beginAgentWitchWriterWork(layout, "run-parked");
    registerAgentWitchWriterWorkPid(layout, id, process.pid);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
    // requestRunInput ends the work when the writer is SIGTERMed for input.
    endAgentWitchWriterWork(layout, id);
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
    expect(onIdle).toHaveBeenCalledTimes(1);
    // finishRun later ends the same id again: no-op, no second idle event.
    endAgentWitchWriterWork(layout, id);
    expect(onIdle).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it("re-beginning the same run id (continuation) never duplicates the entry", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    beginAgentWitchWriterWork(layout, "run-1");
    beginAgentWitchWriterWork(layout, "run-1");
    expect(readAgentWitchWriterWorkState(layout).entries).toHaveLength(1);
    endAgentWitchWriterWork(layout, "run-1");
    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(false);
  });
});
