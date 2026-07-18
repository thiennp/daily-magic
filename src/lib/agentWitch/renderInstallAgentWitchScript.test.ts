import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("renderInstallAgentWitchScript", () => {
  it("approves npm install scripts and opens Home after install on macOS", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain('"allowScripts"');
    expect(script).toContain("npm approve-scripts --allow-scripts-pending");
    expect(script).toContain("register_agent_witch_launch_agent");
    expect(script).toContain('nohup "${RUN_PATH}"');
    expect(script).toContain('open "https://www.agentwitch.com/"');
    expect(script).toContain("wss://www.agentwitch.com/api/agent-witch/ws");
    expect(script).toContain("agentWitchRunSessions.ts");
    expect(script).toContain("agentWitchLocalRunStore.ts");
    expect(script).toContain('INSTALL_DIR="${HOME}/.agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.agent-witch"');
    expect(script).toContain(
      'UPDATER_LAUNCH_AGENT_LABEL="${LAUNCH_AGENT_PREFIX}-updater"',
    );
    expect(script).toContain("self-update.sh");
    expect(script).toContain("install-version.json");
  });

  it("AGENT-004 installs the local app under ~/.local-agent-witch", () => {
    const script = renderInstallAgentWitchScript("http://localhost:3000");

    expect(script).toContain('INSTALL_DIR="${HOME}/.local-agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.local-agent-witch"');
    expect(script).toContain('AGENT_WITCH_WAKE_PORT="47893"');
    expect(script).toContain("ws://localhost:3000/api/agent-witch/ws");
  });

  it("AGENT-005 downloads automation before starting the wake server", () => {
    const script = renderInstallAgentWitchScript("http://localhost:3000");
    const automationIdx = script.indexOf(
      "Downloading Agent Witch automation scheduler",
    );
    const wakeIdx = script.indexOf("Downloading Agent Witch wake server");
    expect(automationIdx).toBeGreaterThan(-1);
    expect(wakeIdx).toBeGreaterThan(-1);
    expect(automationIdx).toBeLessThan(wakeIdx);
    expect(script).toContain(
      'echo "Local link API: http://127.0.0.1:${AGENT_WITCH_WAKE_PORT}/link-account"',
    );
  });
});
