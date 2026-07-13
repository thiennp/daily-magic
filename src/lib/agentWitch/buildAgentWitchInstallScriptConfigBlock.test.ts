import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";

describe("buildAgentWitchInstallScriptConfigBlock", () => {
  it("updates wsUrl when config already exists", () => {
    const block = buildAgentWitchInstallScriptConfigBlock({
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
    });

    expect(block).toContain('"${CONFIG_PATH}" "${PROFILE_EMAIL}"');
    expect(block).toContain(
      '"wss://www.agentwitch.com/api/agent-witch/ws"',
    );
    expect(block).toContain("const wsUrl = process.argv[4] ?? \"\"");
    expect(block).toContain("config.wsUrl = wsUrl");
  });
});
