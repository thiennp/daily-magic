import { describe, expect, it } from "vitest";

import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";

describe("renderUpdateAgentWitchScript", () => {
  it("AGENT-045: reuses the local pairing token and skips opening Home", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).not.toContain("PRESET_PAIRING_TOKEN=");
    expect(script).toContain("AGENT_WITCH_SKIP_OPEN_HOME=1");
    expect(script).toContain('PAIRING_TOKEN="${PRESET_PAIRING_TOKEN:-}"');
    expect(script).toContain("typeof parsed.pairingToken === 'string'");
    expect(script).toContain("agent_witch_resolve_local_pairing_token");
    expect(script).toContain(
      "No linked computer identity found in your local AgentWitch config.",
    );
    expect(script).toContain('"${DEVICE_LABEL}" "${PAIRING_TOKEN}"');
  });

  it("AGENT-050: uses update wording in terminal progress output", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain('echo "Updating AgentWitch…"');
    expect(script).toContain("printf '\\rUpdating… %d%%'");
    expect(script).not.toContain('echo "Installing AgentWitch…"');
  });

  it("AGENT-064: shows current and target bundle version in the terminal", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("agent_witch_print_update_version_summary");
    expect(script).toContain('echo "Current version: ${current_version}"');
    expect(script).toContain('echo "Updating to: ${target_version}"');
  });

  it("AWLR-007: tokenless update does not call local outside a function", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("    has_local_config=0");
    expect(script).not.toContain("local has_local_config");
  });

  it("AGENT-063: run.sh heredoc tolerates unset PRESET_PROFILE_EMAIL under set -u", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).not.toMatch(/PROFILE_EMAIL="\$\{PRESET_PROFILE_EMAIL\}"/);
    expect(script).toContain('PROFILE_EMAIL="${PRESET_PROFILE_EMAIL:-}"');
  });
});
