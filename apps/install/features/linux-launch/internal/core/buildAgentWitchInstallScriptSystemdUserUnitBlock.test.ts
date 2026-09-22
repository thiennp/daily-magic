import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptSystemdUserUnitBlock } from "@agent-witch/install-linux-launch";

describe("buildAgentWitchInstallScriptSystemdUserUnitBlock", () => {
  it("installs a systemd user unit on Linux by default", () => {
    const script = buildAgentWitchInstallScriptSystemdUserUnitBlock();

    expect(script).toContain("agent-witch.service");
    expect(script).toContain("systemctl --user enable --now");
    expect(script).toContain("AGENT_WITCH_FOREGROUND");
  });
});
