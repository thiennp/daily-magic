import { describe, expect, it } from "vitest";

import { renderDeleteAgentWitchScript } from "@/lib/agentWitch/renderDeleteAgentWitchScript";

describe("renderDeleteAgentWitchScript", () => {
  it("stops processes, removes LaunchAgents, and deletes the prod install dir", () => {
    const script = renderDeleteAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("#!/usr/bin/env bash");
    expect(script).toContain('INSTALL_DIR="${HOME}/.agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.agent-witch"');
    expect(script).toContain("pkill -f");
    expect(script).toContain("launchctl bootout");
    expect(script).toContain('rm -rf "${INSTALL_DIR}"');
  });

  it("targets the localhost install layout", () => {
    const script = renderDeleteAgentWitchScript("http://localhost:3000");

    expect(script).toContain('INSTALL_DIR="${HOME}/.local-agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.local-agent-witch"');
  });
});
