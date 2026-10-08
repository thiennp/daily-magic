import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptFinishSummary } from "@/lib/agentWitch/buildAgentWitchInstallScriptFinishSummary";

const runSummary = (env: Readonly<Record<string, string>>): string =>
  execFileSync(
    "bash",
    ["-c", `set -euo pipefail\n${buildAgentWitchInstallScriptFinishSummary()}`],
    {
      env: {
        ...process.env,
        AGENT_WITCH_LINUX_START_NEEDED: "",
        REGISTERED_DEVICE_ID: "",
        ...env,
      },
    },
  ).toString();

const isLinux = process.platform === "linux";

describe("buildAgentWitchInstallScriptFinishSummary", () => {
  it("never claims ready when the Linux client could not be started", () => {
    const script = buildAgentWitchInstallScriptFinishSummary();
    expect(script).toContain('AGENT_WITCH_LINUX_START_NEEDED:-}" == "1"');
    expect(script).toContain("installed but not running yet");
    expect(script).toContain('nohup \\"${RUN_PATH}\\" >/dev/null 2>&1 &');
  });

  it.runIf(isLinux)("prints the start command instead of ready (bash)", () => {
    const out = runSummary({
      AGENT_WITCH_LINUX_START_NEEDED: "1",
      RUN_PATH: "/home/u/.agent-witch/app/command/run.sh",
    });
    expect(out).not.toContain("AgentWitch is ready.");
    expect(out).toContain(
      'nohup "/home/u/.agent-witch/app/command/run.sh" >/dev/null 2>&1 &',
    );
  });

  it.runIf(isLinux)("prints ready, name and device id when started", () => {
    const out = runSummary({
      REGISTERED_DEVICE_ID: "1b2c3d4e-0000-4000-8000-00000000a10f4",
      DEVICE_HOSTNAME: "box",
    });
    expect(out).toContain("AgentWitch is ready.");
    expect(out).toContain('"Linux device · 10F4"');
    expect(out).toContain("Device id: 1b2c3d4e-0000-4000-8000-00000000a10f4");
  });

  it.runIf(isLinux)("skips the device lines when register gave no id", () => {
    const out = runSummary({});
    expect(out.trim()).toBe("AgentWitch is ready.");
  });
});
