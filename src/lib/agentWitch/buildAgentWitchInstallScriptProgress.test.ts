import { spawnSync } from "node:child_process";

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
    expect(block).toContain('echo "Installing AgentWitch…"');
    expect(block).toContain("printf '\\rInstalling… %d%%'");
  });

  it("AGENT-050: uses update wording when replacing an existing install", () => {
    const block = buildAgentWitchInstallScriptProgress({
      updateExistingInstall: true,
    });

    expect(block).toContain('echo "Updating AgentWitch…"');
    expect(block).toContain("printf '\\rUpdating… %d%%'");
    expect(block).not.toContain("Installing");
  });

  it("2331ef53: a failure after setup began prints a re-run hint", () => {
    const run = (body: string) =>
      spawnSync(
        "bash",
        [
          "-c",
          `set -euo pipefail\n${buildAgentWitchInstallScriptProgress()}\n${body}`,
        ],
        { encoding: "utf8" },
      );
    const failed = run("agent_witch_install_step\nfalse");
    const ok = run(
      "agent_witch_install_step\nagent_witch_install_finish_progress",
    );

    expect(failed.status).toBe(1);
    expect(failed.stderr).toContain("Run the same connect command again");
    expect(ok.status).toBe(0);
    expect(ok.stderr).toBe("");
  });

  it("2331ef53: never prints the same percentage twice", () => {
    const steps = Array.from(
      { length: 11 },
      () => "agent_witch_install_step",
    ).join("\n");
    const out = spawnSync(
      "bash",
      [
        "-c",
        `set -euo pipefail\n${buildAgentWitchInstallScriptProgress()}\n${steps}`,
      ],
      { encoding: "utf8" },
    ).stdout;

    expect(out.split("99%").length - 1).toBe(1);
  });
});
