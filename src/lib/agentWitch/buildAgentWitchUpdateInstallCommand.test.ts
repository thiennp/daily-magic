import { describe, expect, it } from "vitest";

import { buildAgentWitchUpdateInstallCommand } from "@/lib/agentWitch/buildAgentWitchUpdateInstallCommand";

describe("buildAgentWitchUpdateInstallCommand", () => {
  it("AGENT-045: points at the update install script without a pairing token", () => {
    expect(
      buildAgentWitchUpdateInstallCommand("https://www.agentwitch.com"),
    ).toBe(
      'curl -fsSL "https://www.agentwitch.com/install/agent-witch-update.sh" | bash',
    );
  });

  it("AGENT-050: keeps the legacy repair URL working for older bookmarks", () => {
    expect(
      buildAgentWitchUpdateInstallCommand("https://www.agentwitch.com/"),
    ).toBe(
      'curl -fsSL "https://www.agentwitch.com/install/agent-witch-update.sh" | bash',
    );
  });
});
