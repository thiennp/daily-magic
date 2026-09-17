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

  it("AGENT-064: shows current and target bundle version in the terminal", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("agent_witch_print_update_version_summary");
    expect(script).toContain('echo "Current version: ${current_version}"');
    expect(script).toContain('echo "Updating to: ${target_version}"');
  });

  it("AGENT-063: run.sh heredoc tolerates unset PRESET_PROFILE_EMAIL under set -u", () => {
    const script = renderUpdateAgentWitchScript("https://www.agentwitch.com");

    expect(script).not.toMatch(/PROFILE_EMAIL="\$\{PRESET_PROFILE_EMAIL\}"/);
    expect(script).toContain('PROFILE_EMAIL="${PRESET_PROFILE_EMAIL:-}"');
  });
});
