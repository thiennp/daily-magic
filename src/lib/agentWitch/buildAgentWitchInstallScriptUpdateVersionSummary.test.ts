import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptUpdateVersionSummary } from "@/lib/agentWitch/buildAgentWitchInstallScriptUpdateVersionSummary";

describe("buildAgentWitchInstallScriptUpdateVersionSummary", () => {
  it("AGENT-064: prints local and remote bundle versions before update progress", () => {
    const block = buildAgentWitchInstallScriptUpdateVersionSummary(
      "https://www.agentwitch.com",
    );

    expect(block).toContain("agent_witch_print_update_version_summary");
    expect(block).toContain('echo "Current version: ${current_version}"');
    expect(block).toContain('echo "Updating to: ${target_version}"');
    expect(block).toContain(
      '"https://www.agentwitch.com/install/agent-witch/version"',
    );
    expect(block).toContain("install-version.json");
  });
});
