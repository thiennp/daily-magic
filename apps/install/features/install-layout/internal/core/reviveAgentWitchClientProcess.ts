import path from "node:path";

import {
  type AgentWitchRevivePlatform,
  buildAgentWitchLinuxManualStartCommand,
  buildAgentWitchReviveSteps,
  resolveAgentWitchRevivePlatform,
} from "./buildAgentWitchReviveSteps";
import { resolveAgentWitchLaunchAgentPrefix } from "./resolveAgentWitchLaunchAgentPrefix.util";

export type AgentWitchReviveProcessOutcome =
  "restarted" | "manual-step-required" | "unsupported-platform" | "failed";

export interface AgentWitchReviveProcessResult {
  readonly ok: boolean;
  readonly platform: AgentWitchRevivePlatform;
  readonly outcome: AgentWitchReviveProcessOutcome;
  readonly message: string;
  /** Command the user can run on this computer when the automatic restart did not happen. */
  readonly manualCommand: string | null;
}

/** Side-effecting restarts, injected so the platform routing stays pure and testable. */
export interface AgentWitchReviveProcessRunners {
  /** macOS: kickstart the client LaunchAgent(s); resolves to the kicked labels. */
  readonly kickstartLaunchAgents: () => Promise<readonly string[]>;
  /** Linux / WSL: `systemctl --user restart agent-witch.service`. */
  readonly restartSystemdUserService: () => Promise<void>;
}

const errorMessageOf = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const isCommandNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "ENOENT";

const reviveMac = async (
  runners: AgentWitchReviveProcessRunners,
  manualCommand: string | null,
): Promise<AgentWitchReviveProcessResult> => {
  try {
    const kicked = await runners.kickstartLaunchAgents();
    return kicked.length > 0
      ? {
          ok: true,
          platform: "mac",
          outcome: "restarted",
          message: `Kickstarted ${kicked.join(", ")}.`,
          manualCommand: null,
        }
      : {
          ok: false,
          platform: "mac",
          outcome: "failed",
          message:
            "No Agent Witch LaunchAgent was kickstarted on this computer.",
          manualCommand,
        };
  } catch (error) {
    return {
      ok: false,
      platform: "mac",
      outcome: "failed",
      message: `LaunchAgent kickstart failed: ${errorMessageOf(error)}`,
      manualCommand,
    };
  }
};

const reviveLinux = async (
  runners: AgentWitchReviveProcessRunners,
  manualCommand: string,
): Promise<AgentWitchReviveProcessResult> => {
  try {
    await runners.restartSystemdUserService();
    return {
      ok: true,
      platform: "linux",
      outcome: "restarted",
      message: "Restarted the agent-witch.service systemd user unit.",
      manualCommand: null,
    };
  } catch (error) {
    return isCommandNotFound(error)
      ? {
          ok: false,
          platform: "linux",
          outcome: "manual-step-required",
          message:
            "systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",
          manualCommand,
        }
      : {
          ok: false,
          platform: "linux",
          outcome: "failed",
          message: `systemd user restart failed: ${errorMessageOf(error)}`,
          manualCommand,
        };
  }
};

/**
 * Restart the Agent Witch client on this computer for its OS: launchctl only on macOS,
 * the systemd user unit on Linux (incl. WSL), and a clear unsupported result elsewhere.
 * Never throws; `platform` is passed in (e.g. `process.platform`).
 */
export const reviveAgentWitchClientProcess = async (input: {
  readonly platform: string;
  readonly installDir: string;
  readonly runners: AgentWitchReviveProcessRunners;
}): Promise<AgentWitchReviveProcessResult> => {
  const platform = resolveAgentWitchRevivePlatform(input.platform);
  const installDirName = path.basename(input.installDir);
  const manualCommandFor = (
    stepPlatform: Exclude<AgentWitchRevivePlatform, "unknown">,
  ): string | null =>
    buildAgentWitchReviveSteps({
      platform: stepPlatform,
      installDirName,
      launchAgentPrefix: resolveAgentWitchLaunchAgentPrefix(input.installDir),
    })[0]?.command ?? null;

  if (platform === "mac") {
    return reviveMac(input.runners, manualCommandFor("mac"));
  }
  if (platform === "linux") {
    return reviveLinux(
      input.runners,
      buildAgentWitchLinuxManualStartCommand(installDirName),
    );
  }
  if (platform === "windows") {
    return {
      ok: false,
      platform,
      outcome: "unsupported-platform",
      message:
        "Agent Witch runs inside WSL on Windows. Restart it from PowerShell with the command below.",
      manualCommand: manualCommandFor("windows"),
    };
  }
  return {
    ok: false,
    platform,
    outcome: "unsupported-platform",
    message: `Restarting the Agent Witch client is not supported on ${input.platform || "this platform"}.`,
    manualCommand: null,
  };
};
