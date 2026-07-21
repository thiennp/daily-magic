import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_INSTALL_PROGRESS_TOTAL,
  buildAgentWitchInstallScriptProgress,
} from "@/lib/agentWitch/buildAgentWitchInstallScriptProgress";

describe("buildAgentWitchInstallScriptProgress", () => {
  it("tracks install progress as a percentage", () => {
    const block = buildAgentWitchInstallScriptProgress();

    expect(block).toContain(
      `AGENT_WITCH_INSTALL_TOTAL=${AGENT_WITCH_INSTALL_PROGRESS_TOTAL}`,
    );
    expect(block).toContain('echo "Installing Agent Witch…"');
    expect(block).toContain("printf '\\rInstalling… %d%%'");
  });

  it("AGENT-050: uses update wording when replacing an existing install", () => {
    const block = buildAgentWitchInstallScriptProgress({
      updateExistingInstall: true,
    });

    expect(block).toContain('echo "Updating Agent Witch…"');
    expect(block).toContain("printf '\\rUpdating… %d%%'");
    expect(block).not.toContain("Installing");
  });
});
