import { describe, expect, it } from "vitest";

import { buildAgentWitchReviveAwlSteps } from "./buildAgentWitchReviveAwlTerminalCommand";

describe("buildAgentWitchReviveAwlSteps", () => {
  it("returns only the launchctl step for a Mac browser", () => {
    const steps = buildAgentWitchReviveAwlSteps({
      operatingSystem: "mac",
      hostname: "www.agentwitch.com",
    });
    expect(steps.map((step) => step.platform)).toEqual(["mac"]);
    expect(steps[0]?.command).toContain("launchctl kickstart");
  });

  it("returns the systemd user unit step for a Linux browser", () => {
    const steps = buildAgentWitchReviveAwlSteps({
      operatingSystem: "linux",
      hostname: "www.agentwitch.com",
    });
    expect(steps.map((step) => step.platform)).toEqual(["linux"]);
    expect(steps[0]?.command).toContain(
      "systemctl --user restart agent-witch.service",
    );
  });

  it("returns the wsl.exe step for a Windows browser", () => {
    const steps = buildAgentWitchReviveAwlSteps({
      operatingSystem: "windows",
      hostname: "www.agentwitch.com",
    });
    expect(steps.map((step) => step.platform)).toEqual(["windows"]);
    expect(steps[0]?.command).toContain("wsl.exe -e bash -lc");
  });

  it("lists every OS for an unknown browser OS", () => {
    const steps = buildAgentWitchReviveAwlSteps({
      operatingSystem: "other",
      hostname: "localhost",
    });
    expect(steps.map((step) => step.platform)).toEqual([
      "mac",
      "linux",
      "windows",
    ]);
    expect(steps[0]?.command).toContain("com.local-agent-witch");
  });
});
