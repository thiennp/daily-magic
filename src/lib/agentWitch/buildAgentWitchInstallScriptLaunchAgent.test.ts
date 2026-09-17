import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";

const readPlistHeredocBody = (
  script: string,
  marker: "cat >" | "cat >>",
): string => {
  const start = script.indexOf(`${marker} "\${PLIST_PATH}" <<EOF`);
  expect(start).toBeGreaterThanOrEqual(0);
  const bodyStart = script.indexOf("\n", start) + 1;
  const end = script.indexOf("\nEOF", bodyStart);
  expect(end).toBeGreaterThan(bodyStart);
  return script.slice(bodyStart, end);
};

describe("buildAgentWitchInstallScriptLaunchAgent", () => {
  it("AGENT-067: does not write process-host bash into the LaunchAgent plist XML", () => {
    const script = buildAgentWitchInstallScriptLaunchAgent();
    const createBody = readPlistHeredocBody(script, "cat >");
    const appendBody = readPlistHeredocBody(script, "cat >>");

    expect(createBody).toContain("<?xml version=");
    expect(createBody).toContain("AGENT_WITCH_WAKE_PORT");
    expect(createBody).not.toContain("agent_witch_is_truthy_env");
    expect(createBody).not.toContain("AWI_PROCESS_HOST_ENV");

    expect(script).toContain(
      "cat >> \"${PLIST_PATH}\" <<'AWI_PROCESS_HOST_ENV'",
    );
    expect(appendBody).toContain("</plist>");
    expect(appendBody).not.toContain("agent_witch_is_truthy_env");
  });
});
