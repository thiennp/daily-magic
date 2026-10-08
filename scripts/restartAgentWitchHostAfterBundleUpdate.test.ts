import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

const kickstartMock = vi.fn(
  async (_installDir: string) => [] as readonly string[],
);
const systemdRestartMock = vi.fn(async () => undefined);
const spawnMock = vi.fn();

vi.mock("@agent-witch/install-macos-launch", () => ({
  bootoutAgentWitchAuxiliaryLaunchAgents: vi.fn(),
  kickstartAgentWitchClientLaunchAgents: (installDir: string) =>
    kickstartMock(installDir),
}));

vi.mock("@agent-witch/install-linux-launch", () => ({
  restartAgentWitchLinuxSystemdUserService: () => systemdRestartMock(),
}));

vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  return {
    ...actual,
    spawn: (command: string, args: readonly string[], options: object) =>
      spawnMock(command, args, options),
  };
});

import {
  clearAgentWitchHostGracefulShutdownForTests,
  isAgentWitchProcessRunningUnderSystemdUserService,
  registerAgentWitchHostGracefulShutdown,
  restartAgentWitchHostAfterBundleUpdate,
  resolveAgentWitchHostRunScriptPath,
} from "./restartAgentWitchHostAfterBundleUpdate";

describe("restartAgentWitchHostAfterBundleUpdate", () => {
  const tempDirs: string[] = [];
  const previousPlatform = process.platform;
  const previousInvocationId = process.env.INVOCATION_ID;

  afterEach(() => {
    Object.defineProperty(process, "platform", { value: previousPlatform });
    if (previousInvocationId === undefined) {
      delete process.env.INVOCATION_ID;
    } else {
      process.env.INVOCATION_ID = previousInvocationId;
    }
    clearAgentWitchHostGracefulShutdownForTests();
    kickstartMock.mockReset();
    kickstartMock.mockResolvedValue([]);
    systemdRestartMock.mockReset();
    spawnMock.mockReset();
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("relaunches detached on non-systemd Linux when run.sh exists", async () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    delete process.env.INVOCATION_ID;

    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "awi-host-restart-"),
    );
    tempDirs.push(installDir);
    const runScript = resolveAgentWitchHostRunScriptPath(installDir);
    fs.mkdirSync(path.dirname(runScript), { recursive: true });
    fs.writeFileSync(runScript, "#!/bin/sh\nexit 0\n", "utf8");

    spawnMock.mockReturnValue({ unref: vi.fn() });
    const exitProcess = vi.fn();

    const result = await restartAgentWitchHostAfterBundleUpdate({
      installDir,
      bundleVersion: "275",
      exitProcess,
    });

    expect(result).toMatchObject({
      ok: true,
      mode: "detached-relaunch",
    });
    expect(spawnMock).toHaveBeenCalledWith(
      "setsid",
      [runScript],
      expect.objectContaining({ cwd: installDir, detached: true }),
    );
    expect(exitProcess).toHaveBeenCalledWith(0);
    expect(systemdRestartMock).not.toHaveBeenCalled();
  });

  it("uses systemd restart when running under a systemd user unit", async () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    process.env.INVOCATION_ID = "test-invocation";

    expect(isAgentWitchProcessRunningUnderSystemdUserService()).toBe(true);

    const exitProcess = vi.fn();
    const result = await restartAgentWitchHostAfterBundleUpdate({
      installDir: "/tmp/aw",
      bundleVersion: "275",
      exitProcess,
    });

    expect(result.mode).toBe("systemd");
    expect(systemdRestartMock).toHaveBeenCalledTimes(1);
    expect(spawnMock).not.toHaveBeenCalled();
    expect(exitProcess).toHaveBeenCalledWith(0);
  });

  it("runs graceful shutdown before relaunch", async () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    delete process.env.INVOCATION_ID;

    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "awi-host-restart-"),
    );
    tempDirs.push(installDir);
    const runScript = resolveAgentWitchHostRunScriptPath(installDir);
    fs.mkdirSync(path.dirname(runScript), { recursive: true });
    fs.writeFileSync(runScript, "#!/bin/sh\n", "utf8");

    const shutdown = vi.fn();
    registerAgentWitchHostGracefulShutdown(shutdown);
    spawnMock.mockReturnValue({ unref: vi.fn() });

    await restartAgentWitchHostAfterBundleUpdate({
      installDir,
      bundleVersion: "275",
      exitProcess: vi.fn(),
    });

    expect(shutdown).toHaveBeenCalledTimes(1);
  });

  it("does not spawn when install entrypoints are missing", async () => {
    Object.defineProperty(process, "platform", { value: "linux" });
    delete process.env.INVOCATION_ID;

    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "awi-host-restart-missing-"),
    );
    tempDirs.push(installDir);

    const exitProcess = vi.fn();
    const result = await restartAgentWitchHostAfterBundleUpdate({
      installDir,
      bundleVersion: "275",
      exitProcess,
    });

    expect(result.ok).toBe(false);
    expect(result.mode).toBe("skipped");
    expect(spawnMock).not.toHaveBeenCalled();
    expect(exitProcess).not.toHaveBeenCalled();
  });
});
