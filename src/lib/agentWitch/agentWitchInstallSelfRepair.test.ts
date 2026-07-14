import { describe, expect, it } from "vitest";

import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

describe("agent witch install self-repair", () => {
  it("serves every client dependency from the install script allowlist", () => {
    for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
      expect(isAgentWitchInstallScriptName(scriptName)).toBe(true);
      expect(
        readAgentWitchInstallScriptSource(scriptName).length,
      ).toBeGreaterThan(0);
    }
  });

  it("downloads every client dependency when install is re-run", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
      expect(script).toContain(
        `https://www.agentwitch.com/install/agent-witch/scripts/${scriptName}`,
      );
      expect(script).toContain(`-o "\${INSTALL_DIR}/${scriptName}"`);
    }
  });

  it("reuses the active profile on repair installs", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("active-profile.json");
    expect(script).toContain("config.wsUrl = wsUrl");
  });
});
