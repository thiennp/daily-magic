import { describe, expect, it } from "vitest";

import { collectAgentWitchAuxiliaryLaunchAgentLabels } from "./bootoutAgentWitchAuxiliaryLaunchAgents";

describe("collectAgentWitchAuxiliaryLaunchAgentLabels", () => {
  it("AGENT-043: treats wake/watchdog/scheduler/updater as auxiliary labels", () => {
    const labels = collectAgentWitchAuxiliaryLaunchAgentLabels(
      "/tmp/nonexistent-install",
    );

    expect(labels).toEqual(
      expect.arrayContaining([
        "com.agent-witch-wake",
        "com.agent-witch-watchdog",
        "com.agent-witch-updater",
        "com.agent-witch-automation-scheduler",
      ]),
    );
  });
});
