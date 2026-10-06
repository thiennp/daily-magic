import { describe, expect, it, vi } from "vitest";

import {
  type AgentWitchReviveProcessRunners,
  reviveAgentWitchClientProcess,
} from "./reviveAgentWitchClientProcess";

const buildRunners = (
  overrides: Partial<AgentWitchReviveProcessRunners> = {},
): AgentWitchReviveProcessRunners => ({
  kickstartLaunchAgents: vi.fn(async () => ["com.agent-witch"]),
  restartSystemdUserService: vi.fn(async () => undefined),
  ...overrides,
});

const revive = (platform: string, runners: AgentWitchReviveProcessRunners) =>
  reviveAgentWitchClientProcess({
    platform,
    installDir: "/home/someone/.agent-witch",
    runners,
  });

describe("reviveAgentWitchClientProcess", () => {
  it("kickstarts LaunchAgents only on macOS", async () => {
    const runners = buildRunners();
    const result = await revive("darwin", runners);

    expect(result).toMatchObject({
      ok: true,
      platform: "mac",
      outcome: "restarted",
      manualCommand: null,
    });
    expect(runners.kickstartLaunchAgents).toHaveBeenCalledTimes(1);
    expect(runners.restartSystemdUserService).not.toHaveBeenCalled();
  });

  it("returns the launchctl command when nothing was kickstarted on macOS", async () => {
    const result = await revive(
      "darwin",
      buildRunners({ kickstartLaunchAgents: vi.fn(async () => []) }),
    );

    expect(result).toMatchObject({ ok: false, outcome: "failed" });
    expect(result.manualCommand).toContain(
      'launchctl kickstart -k "gui/$(id -u)/com.agent-witch"',
    );
  });

  it("restarts the systemd user unit on Linux (and WSL) without launchctl", async () => {
    const runners = buildRunners();
    const result = await revive("linux", runners);

    expect(result).toMatchObject({
      ok: true,
      platform: "linux",
      outcome: "restarted",
    });
    expect(runners.restartSystemdUserService).toHaveBeenCalledTimes(1);
    expect(runners.kickstartLaunchAgents).not.toHaveBeenCalled();
  });

  it("asks for the manual start when systemctl is missing on Linux", async () => {
    const missing = Object.assign(new Error("spawn systemctl ENOENT"), {
      code: "ENOENT",
    });
    const result = await revive(
      "linux",
      buildRunners({
        restartSystemdUserService: vi.fn(async () => Promise.reject(missing)),
      }),
    );

    expect(result).toMatchObject({
      ok: false,
      outcome: "manual-step-required",
      manualCommand:
        'nohup "$HOME/.agent-witch/app/command/run.sh" >/dev/null 2>&1 &',
    });
  });

  it("reports a failed systemd restart without throwing", async () => {
    const result = await revive(
      "linux",
      buildRunners({
        restartSystemdUserService: vi.fn(async () =>
          Promise.reject(
            new Error("systemctl --user restart agent-witch.service exited 1"),
          ),
        ),
      }),
    );

    expect(result).toMatchObject({ ok: false, outcome: "failed" });
    expect(result.message).toContain("exited 1");
    expect(result.manualCommand).toContain("app/command/run.sh");
  });

  it("returns the WSL command as unsupported on native Windows", async () => {
    const runners = buildRunners();
    const result = await revive("win32", runners);

    expect(result).toMatchObject({
      ok: false,
      platform: "windows",
      outcome: "unsupported-platform",
    });
    expect(result.manualCommand).toContain(
      "wsl.exe -e bash -lc 'systemctl --user restart agent-witch.service'",
    );
    expect(runners.kickstartLaunchAgents).not.toHaveBeenCalled();
    expect(runners.restartSystemdUserService).not.toHaveBeenCalled();
  });

  it("returns unsupported for other platforms without running anything", async () => {
    const runners = buildRunners();
    const result = await revive("freebsd", runners);

    expect(result).toMatchObject({
      ok: false,
      platform: "unknown",
      outcome: "unsupported-platform",
      manualCommand: null,
    });
    expect(result.message).toContain("freebsd");
    expect(runners.kickstartLaunchAgents).not.toHaveBeenCalled();
    expect(runners.restartSystemdUserService).not.toHaveBeenCalled();
  });
});
