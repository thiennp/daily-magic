import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

const TEST_PAIRING_TOKEN = "e".repeat(64);

const renderTestInstallScript = (origin: string): string =>
  renderInstallAgentWitchScript(origin, {
    presetPairingToken: TEST_PAIRING_TOKEN,
    presetProfileEmail: "owner@example.com",
  });

describe("renderInstallAgentWitchScript", () => {
  it("approves npm install scripts and opens Home after install on macOS", () => {
    const script = renderTestInstallScript("https://www.agentwitch.com");

    expect(script).toContain('"allowScripts"');
    expect(script).toContain("npm approve-scripts --allow-scripts-pending");
    expect(script).toContain("register_agent_witch_launch_agent");
    expect(script).toContain('nohup "${RUN_PATH}"');
    expect(script).toContain('echo "Installing Agent Witch…"');
    expect(script).toContain("printf '\\rInstalling… %d%%'");
    expect(script).toContain('echo "Agent Witch is ready."');
    expect(script).toContain(
      'open "https://www.agentwitch.com/?awLocalTokenHash=${LOCAL_TOKEN_HASH}"',
    );
    expect(script).toContain(`PRESET_PAIRING_TOKEN="${TEST_PAIRING_TOKEN}"`);
    expect(script).not.toContain("Downloading Agent Witch wake server");
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
    const script = renderTestInstallScript("http://localhost:3000");

    expect(script).toContain('INSTALL_DIR="${HOME}/.local-agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.local-agent-witch"');
    expect(script).toContain('AGENT_WITCH_WAKE_PORT="47893"');
    expect(script).toContain("ws://localhost:3000/api/agent-witch/ws");
  });

  it("AGENT-005 downloads automation scheduler before wake server scripts", () => {
    const script = renderTestInstallScript("http://localhost:3000");
    const automationDownloadIdx = script.indexOf(
      'AUTOMATION_SCHEDULER_SCRIPT_URL}" -o "${INSTALL_DIR}/agent-witch-automation-scheduler.ts',
    );
    const wakeDownloadIdx = script.indexOf(
      'WAKE_SERVER_SCRIPT_URL}" -o "${INSTALL_DIR}/agent-witch-wake-server.ts',
    );
    expect(automationDownloadIdx).toBeGreaterThan(-1);
    expect(wakeDownloadIdx).toBeGreaterThan(-1);
    expect(automationDownloadIdx).toBeLessThan(wakeDownloadIdx);
  });
});
