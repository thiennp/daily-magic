import { describe, expect, it } from "vitest";

import { computeReconnectDelayMs } from "@/features/agent/utils/connectAgentWitchDashboardSocket";

describe("computeReconnectDelayMs", () => {
  it("backs off reconnect attempts", () => {
    expect(computeReconnectDelayMs(0)).toBe(1_000);
    expect(computeReconnectDelayMs(1)).toBe(2_000);
    expect(computeReconnectDelayMs(4)).toBe(16_000);
  });

  it("caps reconnect delay at 30 seconds", () => {
    expect(computeReconnectDelayMs(10)).toBe(30_000);
  });
});
