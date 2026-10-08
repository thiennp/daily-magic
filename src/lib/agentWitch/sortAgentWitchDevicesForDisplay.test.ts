import { describe, expect, it } from "vitest";

import { sortAgentWitchDevicesForDisplay } from "@/lib/agentWitch/sortAgentWitchDevicesForDisplay";

describe("sortAgentWitchDevicesForDisplay (2331ef53)", () => {
  it("keeps the same order whatever the last heartbeat", () => {
    const mac = { id: "mac", claimedAt: "2026-10-01T10:00:00.000Z" };
    const linux = { id: "linux", claimedAt: "2026-10-07T10:00:00.000Z" };
    const twin = { id: "a-twin", claimedAt: "2026-10-07T10:00:00.000Z" };
    const expected = ["a-twin", "linux", "mac"];

    expect(
      sortAgentWitchDevicesForDisplay([mac, linux, twin]).map((d) => d.id),
    ).toEqual(expected);
    expect(
      sortAgentWitchDevicesForDisplay([linux, mac, twin]).map((d) => d.id),
    ).toEqual(expected);
  });
});
