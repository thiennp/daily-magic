import { describe, expect, it } from "vitest";

import {
  buildAgentWitchReviveSteps,
  resolveAgentWitchRevivePlatform,
} from "./buildAgentWitchReviveSteps";

const prodInput = {
  installDirName: ".agent-witch",
  launchAgentPrefix: "com.agent-witch",
} as const;

describe("resolveAgentWitchRevivePlatform", () => {
  it.each([
    ["darwin", "mac"],
    ["mac", "mac"],
    ["linux", "linux"],
    ["win32", "windows"],
    ["windows", "windows"],
    ["other", "unknown"],
    ["freebsd", "unknown"],
    ["", "unknown"],
    [null, "unknown"],
    [undefined, "unknown"],
  ] as const)("maps %s to %s", (value, expected) => {
    expect(resolveAgentWitchRevivePlatform(value)).toBe(expected);
  });
});

describe("buildAgentWitchReviveSteps", () => {
  it("keeps the launchctl kickstart command on macOS", () => {
    const steps = buildAgentWitchReviveSteps({ ...prodInput, platform: "mac" });
    expect(steps).toHaveLength(1);
    expect(steps[0]?.label).toBe("macOS");
    expect(steps[0]?.command).toBe(`AW_HOME="$HOME/.agent-witch"
launchctl kickstart -k "gui/$(id -u)/com.agent-witch"
sleep 2
curl -sS -m 5 "http://127.0.0.1:43347/health" || echo "AWL still not responding — see logs:"
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`);
    expect(steps[0]?.instructions).toContain("this computer");
  });

  it("restarts the systemd user unit on Linux and WSL", () => {
    const steps = buildAgentWitchReviveSteps({
      ...prodInput,
      platform: "linux",
    });
    expect(steps).toHaveLength(1);
    expect(steps[0]?.command).toBe(`systemctl --user restart agent-witch.service
sleep 2
curl -sS -m 5 "http://127.0.0.1:43347/health" || echo "AWL still not responding — see logs:"
journalctl --user -u agent-witch.service -n 50 --no-pager`);
    expect(steps[0]?.command).not.toContain("launchctl");
    expect(steps[0]?.instructions).toContain("this computer");
    expect(steps[0]?.note).toContain(
      'nohup "$HOME/.agent-witch/app/command/run.sh" >/dev/null 2>&1 &',
    );
  });

  it("uses the local install dir in the Linux manual start hint", () => {
    const steps = buildAgentWitchReviveSteps({
      installDirName: ".local-agent-witch",
      launchAgentPrefix: "com.local-agent-witch",
      platform: "linux",
    });
    expect(steps[0]?.note).toContain("$HOME/.local-agent-witch/app/command");
  });

  it("drives the WSL unit through wsl.exe on Windows", () => {
    const steps = buildAgentWitchReviveSteps({
      ...prodInput,
      platform: "windows",
    });
    expect(steps).toHaveLength(1);
    expect(steps[0]?.command).toBe(
      `wsl.exe -e bash -lc 'systemctl --user restart agent-witch.service'
wsl.exe -e bash -lc 'systemctl --user status agent-witch.service'`,
    );
    expect(steps[0]?.command).not.toContain("launchctl");
    expect(steps[0]?.instructions).toContain("PowerShell");
  });

  it("lists every OS when the platform is unknown", () => {
    const steps = buildAgentWitchReviveSteps({
      ...prodInput,
      platform: "unknown",
    });
    expect(steps.map((step) => step.platform)).toEqual([
      "mac",
      "linux",
      "windows",
    ]);
    steps.forEach((step) => {
      expect(step.instructions).toContain("this computer");
      expect(step.instructions).not.toMatch(/this Mac/i);
    });
  });
});
