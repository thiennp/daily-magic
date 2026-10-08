import { describe, expect, it, vi } from "vitest";

import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

import { runAgentWitchHostLauncher } from "./runAgentWitchHostLauncher";
import { stopAgentWitchAccountHosts } from "./stopAgentWitchAccountHosts";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";

const services: AgentWitchHostServicesFile = {
  version: 1,
  mode: "per-account",
  updatedAt: "2026-10-08T00:00:00.000Z",
  accounts: [
    {
      email: AGT,
      launchAgentLabel: "com.agent-witch.bbbbbbbbbbbb",
      systemdUnitName: "agent-witch-bbbbbbbbbbbb.service",
      wakePort: 47901,
    },
    {
      email: GMAIL,
      launchAgentLabel: "com.agent-witch.aaaaaaaaaaaa",
      systemdUnitName: "agent-witch-aaaaaaaaaaaa.service",
      wakePort: 47900,
    },
  ],
};

const baseDeps = () => ({
  launchctl: vi.fn(async () => undefined),
  systemctl: vi.fn(async () => undefined),
  readDiscovery: () => [
    { email: GMAIL, port: 65376, pid: 31, startedAt: "" },
    { email: AGT, port: 60704, pid: 32, startedAt: "" },
  ],
  isProcessAlive: () => true,
  kill: vi.fn(),
  isSystemdUserAvailable: () => false,
});

describe("stopAgentWitchAccountHosts (AWL-ISO-1/4)", () => {
  it("boots out each account LaunchAgent on macOS", async () => {
    const deps = baseDeps();
    await stopAgentWitchAccountHosts({
      installDir: "/x",
      services,
      platform: "darwin",
      uid: 501,
      deps,
    });
    expect(deps.launchctl.mock.calls).toEqual([
      [["bootout", "gui/501/com.agent-witch.bbbbbbbbbbbb"]],
      [["bootout", "gui/501/com.agent-witch.aaaaaaaaaaaa"]],
    ]);
    expect(deps.kill).not.toHaveBeenCalled();
  });

  it("stops (or disables on rollback) only the chosen systemd units", async () => {
    const deps = { ...baseDeps(), isSystemdUserAvailable: () => true };
    await stopAgentWitchAccountHosts({
      installDir: "/x",
      services,
      platform: "linux",
      deps,
    });
    await stopAgentWitchAccountHosts({
      installDir: "/x",
      services,
      platform: "linux",
      onlyEmails: [GMAIL],
      disable: true,
      deps,
    });
    expect(deps.systemctl.mock.calls).toEqual([
      [["stop", "agent-witch-bbbbbbbbbbbb.service"]],
      [["stop", "agent-witch-aaaaaaaaaaaa.service"]],
      [["disable", "--now", "agent-witch-aaaaaaaaaaaa.service"]],
    ]);
  });

  it("SIGTERMs setsid account hosts but never itself", async () => {
    const deps = baseDeps();
    await stopAgentWitchAccountHosts({
      installDir: "/x",
      services,
      platform: "linux",
      selfPid: 31,
      deps,
    });
    expect(deps.kill.mock.calls).toEqual([[32, "SIGTERM"]]);
  });
});

describe("runAgentWitchHostLauncher shutdown", () => {
  it("stops every account host before the launcher exits", async () => {
    const handlers = new Map<string, () => void>();
    const stopHosts = vi.fn(async () => [
      { email: GMAIL, service: "x", ok: true },
    ]);
    const exitProcess = vi.fn();
    const launcher = await runAgentWitchHostLauncher({
      installDir: "/x",
      services,
      startHosts: async () => ({ mode: "launchd", results: [] }),
      stopHosts,
      setIntervalFn: (() => 0) as unknown as typeof setInterval,
      onSignal: (signal, handler) => {
        handlers.set(signal, handler);
      },
      exitProcess,
    });
    handlers.get("SIGTERM")?.();
    handlers.get("SIGTERM")?.();
    await vi.waitFor(() => {
      expect(exitProcess).toHaveBeenCalledWith(0);
    });
    expect(stopHosts).toHaveBeenCalledTimes(1);
    expect(stopHosts).toHaveBeenCalledWith({ installDir: "/x", services });
    launcher.stop();
  });
});
