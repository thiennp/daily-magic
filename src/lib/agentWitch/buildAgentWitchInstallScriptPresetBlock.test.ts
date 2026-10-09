import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptPresetBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptPresetBlock";

describe("buildAgentWitchInstallScriptPresetBlock", () => {
  it("never lets a value run as shell code", () => {
    const block = buildAgentWitchInstallScriptPresetBlock({
      presetPairingToken: "a".repeat(64),
      presetProfileEmail: "x$(id>/tmp/pwn)`id`'; rm -rf ~ #@e.com",
    });
    // inside single quotes $(...) and backticks are plain text; the ' is closed and reopened
    expect(block).toContain("PRESET_PROFILE_EMAIL='");
    expect(block).toContain("'\\''");
    expect(block).not.toContain('PRESET_PROFILE_EMAIL="');
  });
});
