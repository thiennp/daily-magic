import { describe, expect, it } from "vitest";

import { collectAgentWitchLaunchAgentLabels } from "./agentWitchUninstallLocal";

describe("collectAgentWitchLaunchAgentLabels", () => {
  it("MAC_DEVICES-003: includes service launch agents for the install prefix", () => {
    const labels = collectAgentWitchLaunchAgentLabels("/tmp/.agent-witch");

    expect(labels).toContain("com.agent-witch-wake");
    expect(labels).toContain("com.agent-witch-watchdog");
    expect(labels).toContain("com.agent-witch-updater");
    expect(labels).toContain("com.agent-witch-automation-scheduler");
  });

  it("MAC_DEVICES-003: uses the local install prefix for localhost homes", () => {
    const labels = collectAgentWitchLaunchAgentLabels(
      "/tmp/.local-agent-witch",
    );

    expect(labels).toContain("com.local-agent-witch-wake");
    expect(labels).not.toContain("com.agent-witch-wake");
  });
});
