import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptRegisterInstall } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterInstall";

describe("buildAgentWitchInstallScriptRegisterInstall", () => {
  it("AGENT-048: register-install device label includes macOS username", () => {
    const script = buildAgentWitchInstallScriptRegisterInstall({
      appOrigin: "https://www.agentwitch.com",
    });

    expect(script).toContain("MACOS_USERNAME=");
    expect(script).toContain(
      'DEVICE_LABEL="${DEVICE_HOSTNAME}#${MACOS_USERNAME}"',
    );
    expect(script).toContain("/api/agent-witch/register-install");
    expect(script).toContain("installBundleVersion");
    expect(script).toContain("wakePort");
    expect(script).toContain("AGENT_WITCH_WAKE_PORT");
  });
});
