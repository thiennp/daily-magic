import { describe, expect, it } from "vitest";

import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";

describe("renderUpdateAgentWitchScript", () => {
  it("AGENT-045: reuses the local pairing token and skips opening Home", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).not.toContain("PRESET_PAIRING_TOKEN=");
    expect(script).toContain("AGENT_WITCH_SKIP_OPEN_HOME=1");
    expect(script).toContain('PAIRING_TOKEN="${PRESET_PAIRING_TOKEN:-}"');
    expect(script).toContain("typeof parsed.pairingToken === 'string'");
    expect(script).toContain(
      "No linked Mac identity found in your local Agent Witch config.",
    );
    expect(script).toContain('"${DEVICE_LABEL}" "${PAIRING_TOKEN}"');
  });

  it("AGENT-050: uses update wording in terminal progress output", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain('echo "Updating Agent Witch…"');
    expect(script).toContain("printf '\\rUpdating… %d%%'");
    expect(script).not.toContain('echo "Installing Agent Witch…"');
  });
});
