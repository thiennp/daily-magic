import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("agent witch install self-repair", () => {
  it("downloads the bundled Mac client into app/", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain(
      `https://www.agentwitch.com/install/agent-witch/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath}`,
    );
    expect(script).toContain(
      `-o "\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"`,
    );
    expect(script).not.toContain("/install/agent-witch/scripts/");
  });

  it("reuses the active profile on repair installs", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("active-profile.json");
    expect(script).toContain("config.wsUrl = wsUrl");
  });
});
