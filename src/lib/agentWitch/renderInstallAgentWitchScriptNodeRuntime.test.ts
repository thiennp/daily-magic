import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";
import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";

describe("renderInstallAgentWitchScript node runtime", () => {
  it("AGENT-065: install script resolves Node and prompts before Homebrew changes", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com", {
      presetPairingToken: "a".repeat(64),
      presetProfileEmail: "owner@example.com",
    });

    expect(script).toContain("agent_witch_ensure_node_runtime");
    expect(script).toContain("agent_witch_ensure_ollama");
    expect(script).toContain("install ollama");
    expect(script).toContain("Upgrade declined.");
    expect(
      renderUpdateAgentWitchScript("https://www.agentwitch.com"),
    ).toContain("agent_witch_ensure_ollama");
  });
});
