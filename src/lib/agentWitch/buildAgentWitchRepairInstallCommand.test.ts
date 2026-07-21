import { describe, expect, it } from "vitest";

import { buildAgentWitchRepairInstallCommand } from "@/lib/agentWitch/buildAgentWitchRepairInstallCommand";

describe("buildAgentWitchRepairInstallCommand", () => {
  it("AGENT-045: points at the repair install script without a pairing token", () => {
    expect(
      buildAgentWitchRepairInstallCommand("https://www.agentwitch.com"),
    ).toBe(
      'curl -fsSL "https://www.agentwitch.com/install/agent-witch-repair.sh" | bash',
    );
  });
});
