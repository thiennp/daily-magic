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
});
