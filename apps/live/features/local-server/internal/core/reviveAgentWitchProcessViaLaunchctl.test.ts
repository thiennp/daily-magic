import { describe, expect, it, vi } from "vitest";

import { reviveAgentWitchProcessViaLaunchctl } from "./reviveAgentWitchProcessViaLaunchctl";

describe("reviveAgentWitchProcessViaLaunchctl", () => {
  it("kickstarts the label through launchctl on macOS", () => {
    const spawnLaunchctl = vi.fn();
    const result = reviveAgentWitchProcessViaLaunchctl("com.agent-witch", {
      platform: "darwin",
      uid: 501,
      isHostSideEffectAllowed: () => true,
      spawnLaunchctl,
    });

    expect(result.ok).toBe(true);
    expect(spawnLaunchctl).toHaveBeenCalledWith([
      "kickstart",
      "-k",
      "gui/501/com.agent-witch",
    ]);
  });

  it.each(["linux", "win32", "freebsd"])(
    "returns unsupported on %s without spawning launchctl",
    (platform) => {
      const spawnLaunchctl = vi.fn();
      const result = reviveAgentWitchProcessViaLaunchctl("com.agent-witch", {
        platform,
        isHostSideEffectAllowed: () => true,
        spawnLaunchctl,
      });

      expect(result.ok).toBe(false);
      expect(result.message).toContain("only supported on macOS");
      expect(spawnLaunchctl).not.toHaveBeenCalled();
    },
  );

  it("refuses host side effects (e.g. under Vitest) on macOS", () => {
    const spawnLaunchctl = vi.fn();
    const result = reviveAgentWitchProcessViaLaunchctl("com.agent-witch", {
      platform: "darwin",
      isHostSideEffectAllowed: () => false,
      spawnLaunchctl,
    });

    expect(result.ok).toBe(false);
    expect(spawnLaunchctl).not.toHaveBeenCalled();
  });
});
