import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { isAgentWitchBelowMinVersion } from "@/lib/agentWitch/repair/isAgentWitchBelowMinVersion";

describe("isAgentWitchBelowMinVersion", () => {
  it("AWLR-001: uses the single connect-gate minimum by default", () => {
    const min = Number.parseInt(
      AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      10,
    );
    expect(isAgentWitchBelowMinVersion(String(min - 1))).toBe(true);
    expect(isAgentWitchBelowMinVersion(String(min))).toBe(false);
    expect(isAgentWitchBelowMinVersion(String(min + 1))).toBe(false);
  });

  it("AWLR-001: compares numerically, not as strings", () => {
    expect(isAgentWitchBelowMinVersion("9", "35")).toBe(true);
    expect(isAgentWitchBelowMinVersion("100", "35")).toBe(false);
    expect(isAgentWitchBelowMinVersion("265", "76")).toBe(false);
    expect(isAgentWitchBelowMinVersion("75", "76")).toBe(true);
  });

  it("AWLR-001: treats missing or malformed versions as below the minimum", () => {
    expect(isAgentWitchBelowMinVersion(null)).toBe(true);
    expect(isAgentWitchBelowMinVersion(undefined)).toBe(true);
    expect(isAgentWitchBelowMinVersion("")).toBe(true);
    expect(isAgentWitchBelowMinVersion("  ")).toBe(true);
    expect(isAgentWitchBelowMinVersion("unknown")).toBe(true);
    expect(isAgentWitchBelowMinVersion("40.1")).toBe(true);
  });

  it("AWLR-001: trims whitespace around a valid version", () => {
    expect(isAgentWitchBelowMinVersion(" 265 ", "35")).toBe(false);
  });
});
