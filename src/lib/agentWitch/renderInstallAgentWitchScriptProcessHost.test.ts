import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("renderInstallAgentWitchScript process-host (phase 2)", () => {
  it("embeds truthy env helper and install-time capture for split hosting", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("agent_witch_is_truthy_env");
    expect(script).toContain("AGENT_WITCH_INSTALL_EXTERNAL_BRIDGE");
    expect(script).toContain("AGENT_WITCH_INSTALL_EXTERNAL_LIVE");
    expect(script).toContain('exec "${NODE_BIN}" "${APP_BUNDLE}" bridge');
    expect(script).toContain('exec "${NODE_BIN}" "${APP_BUNDLE}" local-app');
    expect(script).toContain("${LAUNCH_AGENT_PREFIX}-live");
    expect(script).toContain("command/live.sh");
    expect(script).toContain(
      "cat >> \"${PLIST_PATH}\" <<'AWI_PROCESS_HOST_ENV'",
    );
  });

  it("AGENT-067: keeps process-host bash outside the LaunchAgent plist XML heredoc", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");
    const plistXmlStart = script.indexOf("<?xml version=");
    const firstEof = script.indexOf("\nEOF", plistXmlStart);

    expect(plistXmlStart).toBeGreaterThanOrEqual(0);
    expect(firstEof).toBeGreaterThan(plistXmlStart);
    expect(script.slice(plistXmlStart, firstEof)).not.toContain(
      "agent_witch_is_truthy_env",
    );
  });
});
