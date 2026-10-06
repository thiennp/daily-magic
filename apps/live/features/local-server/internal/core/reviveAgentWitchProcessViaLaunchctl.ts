import { spawn } from "node:child_process";

import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "@agent-witch/shared/host-side-effects";

export type LaunchctlSpawner = (args: readonly string[]) => void;

export interface ReviveAgentWitchProcessViaLaunchctlResult {
  readonly ok: boolean;
  readonly message: string;
}

const spawnDetachedLaunchctl: LaunchctlSpawner = (args) => {
  const child = spawn("launchctl", [...args], {
    stdio: "ignore",
    detached: true,
  });
  child.on("error", (error) => {
    console.warn(`[agent-witch] launchctl failed: ${error.message}`);
  });
  child.unref();
};

/**
 * `launchctl kickstart -k gui/<uid>/<label>` — macOS only. Other platforms get an
 * unsupported result instead of spawning a missing binary.
 */
export const reviveAgentWitchProcessViaLaunchctl = (
  label: string,
  options: {
    readonly platform?: string;
    readonly uid?: number;
    readonly isHostSideEffectAllowed?: () => boolean;
    readonly spawnLaunchctl?: LaunchctlSpawner;
  } = {},
): ReviveAgentWitchProcessViaLaunchctlResult => {
  const platform = options.platform ?? process.platform;
  if (platform !== "darwin") {
    return {
      ok: false,
      message: `launchctl revive is only supported on macOS (this computer runs ${platform}).`,
    };
  }

  const allowed = options.isHostSideEffectAllowed ?? isHostSideEffectAllowed;
  if (!allowed()) {
    return {
      ok: false,
      message: buildHostSideEffectRefusalMessage("launchctl"),
    };
  }

  const uid = options.uid ?? process.getuid?.() ?? 501;
  const spawnLaunchctl = options.spawnLaunchctl ?? spawnDetachedLaunchctl;
  spawnLaunchctl(["kickstart", "-k", `gui/${uid}/${label}`]);
  return { ok: true, message: `Requested launchctl kickstart for ${label}.` };
};
