import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";

describe("buildAgentWitchInstallScriptConfigBlock", () => {
  it("updates wsUrl when config already exists", () => {
    const block = buildAgentWitchInstallScriptConfigBlock({
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    });

    expect(block).toContain('"${CONFIG_PATH}" "${PROFILE_EMAIL}"');
    expect(block).toContain('"wss://www.agentwitch.com/api/agent-witch/ws"');
    expect(block).toContain('const wsUrl = process.argv[4] ?? ""');
    expect(block).toContain("config.wsUrl = wsUrl");
  });

  it("AGENT-047: allows repair without preset pairing token under nounset", () => {
    const block = buildAgentWitchInstallScriptConfigBlock({
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
      repairExistingInstall: true,
    });

    expect(block).toContain('PAIRING_TOKEN="${PRESET_PAIRING_TOKEN:-}"');
    expect(block).not.toContain('PAIRING_TOKEN="${PRESET_PAIRING_TOKEN}"');
  });

  it("AGENT-047: refuses Connect without profile email and skips stealing active-profile", () => {
    const block = buildAgentWitchInstallScriptConfigBlock({
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    });

    expect(block).toContain(
      "Connect this Mac requires your Agent Witch account email",
    );
    expect(block).toContain(
      "Your account is added as a separate profile and will not replace theirs.",
    );
    expect(block).toContain(
      "Leaving active-profile unchanged so another account on this Mac keeps wake identity.",
    );
    expect(block).toContain("Refusing to overwrite pairing token for");
  });
});
