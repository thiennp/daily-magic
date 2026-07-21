import { describe, expect, it } from "vitest";

import {
  buildAgentWitchInstallDeviceLabel,
  isCompositeAgentWitchInstallDeviceLabel,
  parseAgentWitchInstallDeviceLabel,
} from "@/lib/agentWitch/buildAgentWitchInstallDeviceLabel";

describe("buildAgentWitchInstallDeviceLabel", () => {
  it("AGENT-048: builds hostname#macosUsername for Fast User Switching identity", () => {
    expect(buildAgentWitchInstallDeviceLabel("L92KQX615Q", "thiennguyen")).toBe(
      "L92KQX615Q#thiennguyen",
    );
    expect(buildAgentWitchInstallDeviceLabel("L92KQX615Q", "OtherUser")).toBe(
      "L92KQX615Q#otheruser",
    );
  });

  it("AGENT-048: parses composite and bare legacy labels", () => {
    expect(parseAgentWitchInstallDeviceLabel("L92KQX615Q#alice")).toEqual({
      hostname: "L92KQX615Q",
      macOsUsername: "alice",
    });
    expect(parseAgentWitchInstallDeviceLabel("L92KQX615Q")).toEqual({
      hostname: "L92KQX615Q",
      macOsUsername: null,
    });
    expect(isCompositeAgentWitchInstallDeviceLabel("L92KQX615Q#alice")).toBe(
      true,
    );
    expect(isCompositeAgentWitchInstallDeviceLabel("L92KQX615Q")).toBe(false);
  });

  it("AGENT-006: same hostname with empty username stays bare for legacy callers", () => {
    expect(buildAgentWitchInstallDeviceLabel("Studio-Mac", "")).toBe(
      "Studio-Mac",
    );
  });
});
