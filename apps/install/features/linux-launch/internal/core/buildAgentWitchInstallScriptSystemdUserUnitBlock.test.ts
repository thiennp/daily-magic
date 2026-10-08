import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptSystemdUserUnitBlock } from "@agent-witch/install-linux-launch";

describe("buildAgentWitchInstallScriptSystemdUserUnitBlock", () => {
  it("installs a systemd user unit on Linux by default", () => {
    const script = buildAgentWitchInstallScriptSystemdUserUnitBlock();

    expect(script).toContain("agent-witch.service");
    expect(script).toContain("systemctl --user enable --now");
    expect(script).toContain("AGENT_WITCH_FOREGROUND");
  });

  it("flags a manual start instead of aborting when systemd is missing or has no user bus", () => {
    const script = buildAgentWitchInstallScriptSystemdUserUnitBlock();

    expect(script).not.toContain("systemctl not found");
    expect(script).toContain(
      "if ! systemctl --user daemon-reload >/dev/null 2>&1; then",
    );
    expect(script.match(/AGENT_WITCH_LINUX_START_NEEDED=1/g)).toHaveLength(3);
    expect(script).not.toMatch(/enable --now[^\n]*\|\| true/);
  });
});
