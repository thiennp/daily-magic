import { describe, expect, it } from "vitest";

import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";

describe("resolveAgentSessionTargets", () => {
  it("uses the selected computer before a session starts", () => {
    expect(
      resolveAgentSessionTargets({
        sessionWriterAgent: null,
        writerAgent: "claude-cli",
        sessionDeviceId: null,
        selectedDeviceId: "mac-b",
      }),
    ).toEqual({
      activeWriterAgent: "claude-cli",
      activeDeviceId: "mac-b",
      isWriterAgentLocked: false,
      isMacDeviceLocked: false,
    });
  });

  it("locks the computer and AI during an open session", () => {
    expect(
      resolveAgentSessionTargets({
        sessionWriterAgent: "cursor",
        writerAgent: "claude-cli",
        sessionDeviceId: "mac-a",
        selectedDeviceId: "mac-b",
        availableDeviceIds: ["mac-a", "mac-b"],
      }),
    ).toEqual({
      activeWriterAgent: "cursor",
      activeDeviceId: "mac-a",
      isWriterAgentLocked: true,
      isMacDeviceLocked: true,
    });
  });

  it("drops a persisted session Mac that is no longer available (AGENT-023)", () => {
    expect(
      resolveAgentSessionTargets({
        sessionWriterAgent: "cursor",
        writerAgent: "claude-cli",
        sessionDeviceId: "revoked-mac",
        selectedDeviceId: "live-mac",
        availableDeviceIds: new Set(["live-mac"]),
      }),
    ).toEqual({
      activeWriterAgent: "cursor",
      activeDeviceId: "live-mac",
      isWriterAgentLocked: true,
      isMacDeviceLocked: false,
    });
  });
});

describe("resolveAgentSessionTargets (ed42d8ce: only a live session locks)", () => {
  const ended = {
    sessionWriterAgent: "codex",
    writerAgent: "claude-cli",
    sessionDeviceId: "device-9031",
    selectedDeviceId: "device-8f03",
    availableDeviceIds: ["device-9031", "device-8f03"],
    isSessionLive: false,
  } as const;

  it("an ended or stale session never pins the computer or coding tool", () => {
    expect(resolveAgentSessionTargets(ended)).toEqual({
      activeWriterAgent: "claude-cli",
      activeDeviceId: "device-8f03",
      isWriterAgentLocked: false,
      isMacDeviceLocked: false,
    });
  });

  it("a live session still locks both", () => {
    expect(
      resolveAgentSessionTargets({ ...ended, isSessionLive: true }),
    ).toEqual({
      activeWriterAgent: "codex",
      activeDeviceId: "device-9031",
      isWriterAgentLocked: true,
      isMacDeviceLocked: true,
    });
  });
});
