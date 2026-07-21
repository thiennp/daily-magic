import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./isActiveMacOsConsoleUser", () => ({
  isActiveMacOsConsoleUser: vi.fn(() => true),
}));

vi.mock("./agentWitchWatchdogLog", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("./agentWitchWatchdogLog")>();
  return {
    ...actual,
    appendAgentWitchWatchdogLog: vi.fn(actual.appendAgentWitchWatchdogLog),
  };
});

vi.mock("./agentWitchConnectionHealth", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("./agentWitchConnectionHealth")>();
  return {
    ...actual,
    readAgentWitchConnectionHealth: vi.fn(),
  };
});

vi.mock("./isAgentWitchLaunchAgentRunning", () => ({
  isAgentWitchLaunchAgentRunning: vi.fn(),
}));

vi.mock("./kickstartAgentWitchLaunchAgent", () => ({
  kickstartAgentWitchLaunchAgent: vi.fn(),
}));

vi.mock("./listAgentWitchLaunchTargets", () => ({
  listAgentWitchLaunchTargets: vi.fn(),
}));

vi.mock("./spawnAgentWitchClient", () => ({
  spawnAgentWitchClient: vi.fn(),
}));

vi.mock("./attemptAgentWitchWatchdogReinstall", () => ({
  attemptAgentWitchWatchdogReinstall: vi.fn(),
}));

vi.mock("./verifyAgentWitchReviveAfterKickstart", () => ({
  verifyAgentWitchReviveAfterKickstart: vi.fn(),
}));

import { isActiveMacOsConsoleUser } from "./isActiveMacOsConsoleUser";
import { readAgentWitchConnectionHealth } from "./agentWitchConnectionHealth";
import { isAgentWitchLaunchAgentRunning } from "./isAgentWitchLaunchAgentRunning";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { attemptAgentWitchWatchdogReinstall } from "./attemptAgentWitchWatchdogReinstall";
import { reviveAgentWitchWebSocket } from "./reviveAgentWitchWebSocket";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import { verifyAgentWitchReviveAfterKickstart } from "./verifyAgentWitchReviveAfterKickstart";

beforeEach(() => {
  vi.mocked(isActiveMacOsConsoleUser).mockReturnValue(true);
  vi.mocked(verifyAgentWitchReviveAfterKickstart).mockResolvedValue(true);
  vi.mocked(attemptAgentWitchWatchdogReinstall).mockResolvedValue({
    attempted: false,
    ok: false,
    targets: [],
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("reviveAgentWitchWebSocket", () => {
  it("AGENT-042: skips revive when this macOS account is not the console user", async () => {
    vi.mocked(isActiveMacOsConsoleUser).mockReturnValue(false);

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(listAgentWitchLaunchTargets).not.toHaveBeenCalled();
    expect(result).toEqual({ ok: true, targets: [] });
  });

  it("kickstarts launch agents with stale connection health", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([
      {
        profileEmail: "user@example.com",
        launchAgentLabel: "com.agent-witch.user-at-example-com",
      },
    ]);
    vi.mocked(isAgentWitchLaunchAgentRunning).mockResolvedValue(true);
    vi.mocked(readAgentWitchConnectionHealth).mockReturnValue({
      lastAckAt: "2020-01-01T00:00:00.000Z",
      wsUrl: "ws://localhost:3000/api/agent-witch/ws",
      connectedAt: "2020-01-01T00:00:00.000Z",
    });
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(kickstartAgentWitchLaunchAgent).toHaveBeenCalledWith(
      "com.agent-witch.user-at-example-com",
    );
    expect(result.targets[0]).toMatchObject({
      revived: true,
      reason: "stale_connection",
    });
  });

  it("skips healthy launch agents", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([
      {
        profileEmail: "user@example.com",
        launchAgentLabel: "com.agent-witch.user-at-example-com",
      },
    ]);
    vi.mocked(isAgentWitchLaunchAgentRunning).mockResolvedValue(true);
    vi.mocked(readAgentWitchConnectionHealth).mockReturnValue({
      lastAckAt: new Date().toISOString(),
      wsUrl: "ws://localhost:3000/api/agent-witch/ws",
      connectedAt: new Date().toISOString(),
    });

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(kickstartAgentWitchLaunchAgent).not.toHaveBeenCalled();
    expect(result.targets[0]).toMatchObject({
      revived: false,
      reason: "healthy",
    });
  });

  it("revives agents that are not running", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([
      {
        profileEmail: null,
        launchAgentLabel: "com.agent-witch",
      },
    ]);
    vi.mocked(isAgentWitchLaunchAgentRunning).mockResolvedValue(false);
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(readAgentWitchConnectionHealth).not.toHaveBeenCalled();
    expect(result.targets[0]).toMatchObject({
      revived: true,
      reason: "not_running",
    });
  });

  it("spawns a client when no launch targets exist", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([]);
    vi.mocked(spawnAgentWitchClient).mockReturnValue({ ok: true });

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(spawnAgentWitchClient).toHaveBeenCalled();
    expect(result.targets[0]).toMatchObject({
      launchAgentLabel: "direct-spawn",
      revived: true,
    });
  });

  it("AGENT-058: keeps kickstart success when verify helper is unavailable", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([
      {
        profileEmail: null,
        launchAgentLabel: "com.agent-witch",
      },
    ]);
    vi.mocked(isAgentWitchLaunchAgentRunning).mockResolvedValue(false);
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({ ok: true });
    vi.mocked(verifyAgentWitchReviveAfterKickstart).mockRejectedValue(
      new Error("ERR_MODULE_NOT_FOUND"),
    );

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(result.targets[0]).toMatchObject({
      revived: true,
      reason: "not_running",
    });
  });

  it("reinstalls from the install script when kickstart cannot restore ws", async () => {
    vi.mocked(listAgentWitchLaunchTargets).mockReturnValue([
      {
        profileEmail: "user@example.com",
        launchAgentLabel: "com.agent-witch.user-at-example-com",
      },
    ]);
    vi.mocked(isAgentWitchLaunchAgentRunning).mockResolvedValue(false);
    vi.mocked(kickstartAgentWitchLaunchAgent).mockResolvedValue({
      ok: false,
      errorMessage: "kickstart failed",
    });
    vi.mocked(attemptAgentWitchWatchdogReinstall).mockResolvedValue({
      attempted: true,
      ok: true,
      targets: [
        {
          launchAgentLabel: "com.agent-witch.user-at-example-com",
          profileEmail: "user@example.com",
          revived: true,
          reason: "not_running",
        },
      ],
    });

    const result = await reviveAgentWitchWebSocket({ skipLog: true });

    expect(attemptAgentWitchWatchdogReinstall).toHaveBeenCalled();
    expect(result.reinstallAttempted).toBe(true);
    expect(result.reinstallOk).toBe(true);
    expect(result.targets[0]?.revived).toBe(true);
  });
});
