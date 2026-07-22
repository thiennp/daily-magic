import { describe, expect, it } from "vitest";

import { buildAgentWitchDeleteLocalInstallCommand } from "@/lib/agentWitch/buildAgentWitchDeleteLocalInstallCommand";

describe("buildAgentWitchDeleteLocalInstallCommand", () => {
  it("builds a curl | bash delete command", () => {
    expect(
      buildAgentWitchDeleteLocalInstallCommand("https://www.agentwitch.com"),
    ).toBe(
      'curl -fsSL "https://www.agentwitch.com/install/agent-witch-delete.sh" | bash',
    );
  });
});
