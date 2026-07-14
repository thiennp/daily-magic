import { afterEach, describe, expect, it, vi } from "vitest";

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

import { readAgentWitchConnectionHealth } from "./agentWitchConnectionHealth";
import { isAgentWitchLaunchAgentRunning } from "./isAgentWitchLaunchAgentRunning";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { reviveAgentWitchWebSocket } from "./reviveAgentWitchWebSocket";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";

afterEach(() => {
  vi.clearAllMocks();
});

describe("reviveAgentWitchWebSocket", () => {
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
});
