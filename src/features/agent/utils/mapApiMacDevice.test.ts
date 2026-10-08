import { describe, expect, it } from "vitest";

import { mapApiMacDevice } from "@/features/agent/utils/mapApiMacDevice";

const row = {
  id: "347a1364",
  deviceLabel: "grok#box",
  displayName: null,
  claimedAt: "2026-10-08T20:46:00.000Z",
  lastSeenAt: null,
  lastHeartbeatAt: null,
};

describe("mapApiMacDevice (77e29f7a)", () => {
  it("keeps the heartbeat writers so the composer can warn", () => {
    const device = mapApiMacDevice({
      ...row,
      writers: [
        { writerAgent: "codex", ready: true, loggedIn: false },
        { writerAgent: "antigravity", ready: true, loggedIn: null },
      ],
    });

    expect(device.writers).toEqual([
      { writerAgent: "codex", ready: false, loggedIn: false },
      { writerAgent: "antigravity", ready: true, loggedIn: null },
    ]);
  });

  it("leaves writers out when an older server sends none", () => {
    expect(mapApiMacDevice(row).writers).toBeUndefined();
  });
});
