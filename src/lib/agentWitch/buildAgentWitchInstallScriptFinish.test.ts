import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptFinish } from "@/lib/agentWitch/buildAgentWitchInstallScriptFinish";

describe("buildAgentWitchInstallScriptFinish", () => {
  it("opens Home only after install completes", () => {
    const block = buildAgentWitchInstallScriptFinish({
      appOrigin: "https://www.agentwitch.com",
    });

    expect(block).toContain("agent_witch_install_finish_progress");
    expect(block).toContain('echo "Agent Witch is ready."');
    expect(block).toContain(
      'launchctl kickstart -k "gui/$(id -u)/${LAUNCH_AGENT_LABEL}"',
    );
    expect(block).toContain(
      'open "https://www.agentwitch.com/?awLocalTokenHash=${LOCAL_TOKEN_HASH}"',
    );
  });
});
