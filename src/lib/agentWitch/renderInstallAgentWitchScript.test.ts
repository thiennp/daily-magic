import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

const TEST_PAIRING_TOKEN = "e".repeat(64);

const renderTestInstallScript = (origin: string): string =>
  renderInstallAgentWitchScript(origin, {
    presetPairingToken: TEST_PAIRING_TOKEN,
    presetProfileEmail: "owner@example.com",
  });

describe("renderInstallAgentWitchScript", () => {
  it("downloads the bundled Mac client and native deps on macOS", () => {
    const script = renderTestInstallScript("https://www.agentwitch.com");

    expect(script).not.toContain("npm install");
    expect(script).not.toContain('cat > "${INSTALL_DIR}/package.json"');
    expect(script).toContain("deps.tar.gz");
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
    expect(script).toContain(
      `install/agent-witch/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath}`,
    );
    expect(script).toContain('APP_DIR="${INSTALL_DIR}/app"');
    expect(script).toContain('COMMAND_DIR="${INSTALL_DIR}/command"');
    expect(script).toContain('INSTALL_DIR="${HOME}/.agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.agent-witch"');
    expect(script).toContain("command/self-update.sh");
    expect(script).toContain('PROFILE_DIR}/projects"');
    expect(script).toContain('PROFILE_DIR}/logs"');
    expect(script).toContain("resolve_agent_witch_profile_paths");
    expect(script).toContain("MAIN_LOG_PATH");
    expect(script).toContain("ERROR_LOG_PATH");
    expect(script).toContain('PROFILE_DIR}/reports"');
    expect(script).toContain("install-version.json");
  });

  it("AGENT-004 installs the local app under ~/.local-agent-witch", () => {
    const script = renderTestInstallScript("http://localhost:3000");

    expect(script).toContain('INSTALL_DIR="${HOME}/.local-agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.local-agent-witch"');
    expect(script).toContain("wake-port.json");
    expect(script).toContain("ws://localhost:3000/api/agent-witch/ws");
  });

  it("AGENT-051: writes install-version.json before starting the launch agent", () => {
    const script = renderTestInstallScript("https://www.agentwitch.com");
    const versionStampIdx = script.indexOf(
      'cat > "${INSTALL_DIR}/install-version.json"',
    );
    const launchAgentIdx = script.indexOf(
      'register_agent_witch_launch_agent "${LAUNCH_AGENT_LABEL}"',
    );

    expect(versionStampIdx).toBeGreaterThan(-1);
    expect(launchAgentIdx).toBeGreaterThan(-1);
    expect(versionStampIdx).toBeLessThan(launchAgentIdx);
  });

  it("ships the bundled client before launch agent registration", () => {
    const script = renderTestInstallScript("http://localhost:3000");
    const bundleDownloadIdx = script.indexOf(
      `http://localhost:3000/install/agent-witch/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath}`,
    );
    const launchAgentIdx = script.indexOf(
      'register_agent_witch_launch_agent "${LAUNCH_AGENT_LABEL}"',
    );

    expect(bundleDownloadIdx).toBeGreaterThan(-1);
    expect(launchAgentIdx).toBeGreaterThan(-1);
    expect(bundleDownloadIdx).toBeLessThan(launchAgentIdx);
  });
});
