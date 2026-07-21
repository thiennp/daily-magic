import { describe, expect, it } from "vitest";

import { isReusableDeviceLabel } from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";

describe("isReusableDeviceLabel", () => {
  it("AGENT-006: rejects empty and generic Mac labels for reclaim", () => {
    expect(isReusableDeviceLabel(null)).toBe(false);
    expect(isReusableDeviceLabel("")).toBe(false);
    expect(isReusableDeviceLabel("   ")).toBe(false);
    expect(isReusableDeviceLabel("Mac")).toBe(false);
    expect(isReusableDeviceLabel("mac")).toBe(false);
  });

  it("AGENT-006: accepts real hostnames for same-Mac reclaim", () => {
    expect(isReusableDeviceLabel("L92KQX615Q")).toBe(true);
    expect(isReusableDeviceLabel("Thiens-MacBook-Pro.local")).toBe(true);
  });

  it("AGENT-048: accepts hostname#macosUsername install labels", () => {
    expect(isReusableDeviceLabel("L92KQX615Q#thiennguyen")).toBe(true);
    expect(isReusableDeviceLabel("L92KQX615Q#otheruser")).toBe(true);
  });
});
