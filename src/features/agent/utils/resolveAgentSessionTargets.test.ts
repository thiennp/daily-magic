import { describe, expect, it } from "vitest";

import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";

describe("resolveAgentSessionTargets", () => {
  it("uses the selected Mac before a session starts", () => {
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

  it("locks the Mac and AI during an open session", () => {
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
