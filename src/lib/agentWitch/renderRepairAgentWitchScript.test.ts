import { describe, expect, it } from "vitest";

import { renderRepairAgentWitchScript } from "@/lib/agentWitch/renderRepairAgentWitchScript";

describe("renderRepairAgentWitchScript", () => {
  it("AGENT-045: reuses the local pairing token and skips opening Home", () => {
    const script = renderRepairAgentWitchScript("https://www.agentwitch.com");

    expect(script).not.toContain("PRESET_PAIRING_TOKEN=");
    expect(script).toContain('PAIRING_TOKEN="${PRESET_PAIRING_TOKEN:-}"');
    expect(script).toContain("AGENT_WITCH_SKIP_OPEN_HOME=1");
    expect(script).toContain("typeof parsed.pairingToken === 'string'");
    expect(script).toContain(
      "No linked Mac identity found in your local Agent Witch config.",
    );
    expect(script).toContain('"${DEVICE_LABEL}" "${PAIRING_TOKEN}"');
  });
});
