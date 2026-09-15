import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("renderInstallAgentWitchScript node runtime", () => {
  it("AGENT-065: install script resolves Node and prompts before Homebrew changes", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com", {
      presetPairingToken: "a".repeat(64),
      presetProfileEmail: "owner@example.com",
    });

    expect(script).toContain("agent_witch_ensure_node_runtime");
    expect(script).toContain("Upgrade declined.");
  });
});
