import { describe, expect, it } from "vitest";

import { shouldTriggerAgentWitchHeartbeatSelfUpdate } from "./shouldTriggerAgentWitchHeartbeatSelfUpdate";

describe("shouldTriggerAgentWitchHeartbeatSelfUpdate", () => {
  it("triggers when local is missing or different (AGENT-030)", () => {
    expect(
      shouldTriggerAgentWitchHeartbeatSelfUpdate({
        localBundleVersion: null,
        remoteBundleVersion: "32",
      }),
    ).toBe(true);
    expect(
      shouldTriggerAgentWitchHeartbeatSelfUpdate({
        localBundleVersion: "31",
        remoteBundleVersion: "32",
      }),
    ).toBe(true);
  });

  it("skips when versions match or remote is absent (AGENT-030)", () => {
    expect(
      shouldTriggerAgentWitchHeartbeatSelfUpdate({
        localBundleVersion: "32",
        remoteBundleVersion: "32",
      }),
    ).toBe(false);
    expect(
      shouldTriggerAgentWitchHeartbeatSelfUpdate({
        localBundleVersion: "31",
        remoteBundleVersion: null,
      }),
    ).toBe(false);
  });
});
