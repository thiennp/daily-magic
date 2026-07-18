import { beforeEach, describe, expect, it } from "vitest";

import {
  clearShellSessionsForTests,
  createShellSession,
  getShellSession,
  getShellSessionByDevice,
  removeShellSession,
} from "@/lib/dispatch/shellSessionRegistry";

describe("shellSessionRegistry", () => {
  beforeEach(() => {
    clearShellSessionsForTests();
  });

  it("keeps interactive and agent shells separate per device", () => {
    const interactive = createShellSession({
      ownerUserId: "owner-1",
      deviceId: "device-1",
      mode: "interactive",
    });
    const agent = createShellSession({
      ownerUserId: "owner-1",
      deviceId: "device-1",
      mode: "agent",
      activeRunId: "run-1",
    });

    expect(interactive.shellSessionId).not.toBe(agent.shellSessionId);
    expect(
      getShellSessionByDevice("owner-1", "device-1", "interactive")
        ?.shellSessionId,
    ).toBe(interactive.shellSessionId);
    expect(
      getShellSessionByDevice("owner-1", "device-1", "agent")?.shellSessionId,
    ).toBe(agent.shellSessionId);
  });

  it("removes sessions from the device index", () => {
    const session = createShellSession({
      ownerUserId: "owner-1",
      deviceId: null,
      mode: "interactive",
    });
    removeShellSession(session.shellSessionId);
    expect(getShellSession(session.shellSessionId)).toBeUndefined();
    expect(
      getShellSessionByDevice("owner-1", null, "interactive"),
    ).toBeUndefined();
  });

  it("AGENT-015: keeps sessions on globalThis across registry reloads", () => {
    const session = createShellSession({
      ownerUserId: "owner-shared",
      deviceId: "device-shared",
      mode: "agent",
      activeRunId: "run-shared",
    });
    const fromGlobal = (
      globalThis as typeof globalThis & {
        __dailyMagicShellSessions?: Map<string, { shellSessionId: string }>;
      }
    ).__dailyMagicShellSessions?.get(session.shellSessionId);
    expect(fromGlobal?.shellSessionId).toBe(session.shellSessionId);
  });
});
