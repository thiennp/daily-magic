import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptRegisterLaunchAgentFn } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterLaunchAgent";

describe("buildAgentWitchInstallScriptRegisterLaunchAgentFn", () => {
  it("AGENT-067: lints the LaunchAgent plist before launchctl bootstrap", () => {
    const script = buildAgentWitchInstallScriptRegisterLaunchAgentFn();

    expect(script).toContain("agent_witch_is_truthy_env");
    expect(script).toContain("plutil -lint");
    expect(script).toContain(
      'echo "LaunchAgent plist is invalid XML: ${plist_path}" >&2',
    );
  });
});
