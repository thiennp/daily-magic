import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptProcessHostLaunchAgentEnvEntries } from "./buildAgentWitchInstallScriptProcessHostBash";

describe("buildAgentWitchInstallScriptProcessHostLaunchAgentEnvEntries", () => {
  it("AGENT-067: appends optional env keys onto the LaunchAgent plist file", () => {
    const script =
      buildAgentWitchInstallScriptProcessHostLaunchAgentEnvEntries();

    expect(script).toContain(
      "cat >> \"${PLIST_PATH}\" <<'AWI_PROCESS_HOST_ENV'",
    );
    expect(script).not.toMatch(/cat <<'AWI_PROCESS_HOST_ENV'/);
  });
});
