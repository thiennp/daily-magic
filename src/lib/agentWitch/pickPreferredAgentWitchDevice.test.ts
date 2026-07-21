import { describe, expect, it } from "vitest";

import {
  pickPreferredAgentWitchDevice,
  scoreAgentWitchDevicePreference,
} from "@/lib/agentWitch/pickPreferredAgentWitchDevice";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const buildDevice = (
  overrides: Partial<AgentWitchDeviceRecord> &
    Pick<AgentWitchDeviceRecord, "id">,
): AgentWitchDeviceRecord => ({
  userId: "user-1",
  deviceLabel: "Studio-Mac",
  displayName: null,
  dispatchPolicy: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-02T00:00:00.000Z",
  revokedAt: null,
  ...overrides,
});

describe("pickPreferredAgentWitchDevice", () => {
  it("AGENT-046: prefers the live connected device over a stale duplicate", () => {
    const connected = buildDevice({
      id: "device-connected",
      installBundleVersion: "45",
      lastSeenAt: "2026-07-21T08:00:00.000Z",
    });
    const stale = buildDevice({
      id: "device-stale",
      lastSeenAt: "2026-07-21T07:59:00.000Z",
    });

    expect(
      pickPreferredAgentWitchDevice(
        [stale, connected],
        new Set(["device-connected"]),
      ).id,
    ).toBe("device-connected");
  });

  it("AGENT-046: prefers rows with bundle version and recency when not live", () => {
    const bundled = buildDevice({
      id: "device-bundled",
      installBundleVersion: "45",
      lastSeenAt: "2026-07-21T08:00:00.000Z",
    });
    const unknown = buildDevice({
      id: "device-unknown",
      lastSeenAt: "2026-07-21T08:01:00.000Z",
    });

    expect(
      scoreAgentWitchDevicePreference(bundled, undefined) >
        scoreAgentWitchDevicePreference(unknown, undefined),
    ).toBe(true);
    expect(pickPreferredAgentWitchDevice([unknown, bundled]).id).toBe(
      "device-bundled",
    );
  });
});
