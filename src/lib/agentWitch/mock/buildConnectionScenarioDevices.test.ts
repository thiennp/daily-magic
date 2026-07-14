import { describe, expect, it } from "vitest";

import {
  buildConnectionScenarioDevices,
  shouldMockDevicesApiFail,
} from "@/lib/agentWitch/mock/buildConnectionScenarioDevices";

describe("buildConnectionScenarioDevices", () => {
  it("returns mixed online/offline devices", () => {
    const devices = buildConnectionScenarioDevices("mixed");
    expect(devices).toHaveLength(2);
    expect(devices?.some((device) => device.isOnline)).toBe(true);
    expect(devices?.some((device) => !device.isOnline)).toBe(true);
  });

  it("returns no devices for the empty scenario", () => {
    expect(buildConnectionScenarioDevices("no-devices")).toEqual([]);
  });

  it("marks api-error as a mock API failure", () => {
    expect(shouldMockDevicesApiFail("api-error")).toBe(true);
    expect(shouldMockDevicesApiFail("mixed")).toBe(false);
  });
});
