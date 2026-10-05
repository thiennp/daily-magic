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
    projectDataDir: path.join(installDir, "profiles", profileEmail, "project-data"),
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

  it("keeps a fresh legacy counter (no ownerPid) in progress", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
    expect(readAgentWitchWriterWorkState(layout).activeCount).toBe(1);
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

  it("keeps a fresh counter owned by a live process in progress", () => {
    const layout = createTempLayout();
    layouts.push(layout);
    writeState(layout, {
      activeCount: 1,
      updatedAt: new Date().toISOString(),
      ownerPid: process.pid,
    });

    expect(isAgentWitchWriterWorkInProgress(layout)).toBe(true);
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
      isAgentWitchWriterWorkStateStale({ activeCount: 0, updatedAt: old }, alive),
    ).toBe(false);
    expect(
      isAgentWitchWriterWorkStateStale({ activeCount: 1, updatedAt: fresh }, alive),
    ).toBe(false);
    expect(
      isAgentWitchWriterWorkStateStale({ activeCount: 1, updatedAt: old }, alive),
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
    ).toBe(false);
    expect(
      isAgentWitchWriterWorkStateStale(
        { activeCount: 1, updatedAt: "not-a-date" },
        alive,
      ),
    ).toBe(true);
  });
});
