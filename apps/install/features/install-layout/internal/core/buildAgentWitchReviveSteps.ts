import { AGENT_WITCH_SYSTEMD_USER_UNIT_NAME } from "@agent-witch/install-linux-launch/types";
import { buildAgentWitchLocalHealthCheckCommand } from "@agent-witch/shared/network";

export type AgentWitchRevivePlatform = "mac" | "linux" | "windows" | "unknown";

export type AgentWitchReviveKnownPlatform = Exclude<
  AgentWitchRevivePlatform,
  "unknown"
>;

export interface AgentWitchReviveStep {
  readonly platform: AgentWitchReviveKnownPlatform;
  readonly label: string;
  readonly instructions: string;
  readonly command: string;
  readonly note: string;
}

export interface AgentWitchReviveStepsInput {
  readonly platform: AgentWitchRevivePlatform;
  readonly installDirName: string;
  readonly launchAgentPrefix: string;
}

const REVIVE_PLATFORM_BY_NAME: Readonly<
  Record<string, AgentWitchReviveKnownPlatform>
> = {
  darwin: "mac",
  mac: "mac",
  macos: "mac",
  linux: "linux",
  wsl: "linux",
  win32: "windows",
  windows: "windows",
};

/** Maps `process.platform`, a browser OS name or a device platform to a revive platform. */
export const resolveAgentWitchRevivePlatform = (
  value: string | null | undefined,
): AgentWitchRevivePlatform =>
  REVIVE_PLATFORM_BY_NAME[(value ?? "").trim().toLowerCase()] ?? "unknown";

/** Manual start the Linux install script documents when systemd is missing (`nohup "${RUN_PATH}"`). */
export const buildAgentWitchLinuxManualStartCommand = (
  installDirName: string,
): string =>
  `nohup "$HOME/${installDirName}/app/command/run.sh" >/dev/null 2>&1 &`;

/** DF-033: health on the per-account port AWL saved (H6), not legacy 43347. */
const healthCheckLine = (installDirName: string): string =>
  `${buildAgentWitchLocalHealthCheckCommand(installDirName)} || echo "AWL still not responding — see logs:"`;

/** macOS: LaunchAgent written by the install script (prefix from install-layout types). */
const buildMacReviveStep = (
  input: AgentWitchReviveStepsInput,
): AgentWitchReviveStep => ({
  platform: "mac",
  label: "macOS",
  instructions:
    "On this computer, open Terminal, paste this command, and press Return.",
  command: `AW_HOME="$HOME/${input.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${input.launchAgentPrefix}"
sleep 2
${healthCheckLine(input.installDirName)}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,
  note: "Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent.",
});

/** Linux and WSL: systemd user unit written by the install script (linux-launch slice). */
const buildLinuxReviveStep = (
  input: AgentWitchReviveStepsInput,
): AgentWitchReviveStep => ({
  platform: "linux",
  label: "Linux or WSL",
  instructions:
    "On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",
  command: `systemctl --user restart ${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME}
sleep 2
${healthCheckLine(input.installDirName)}
journalctl --user -u ${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME} -n 50 --no-pager`,
  note: `If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${buildAgentWitchLinuxManualStartCommand(input.installDirName)}`,
});

/** Windows: AWL runs inside WSL; the tray drives it with `wsl.exe -e bash -lc` (apps/desktop). */
const buildWindowsReviveStep = (): AgentWitchReviveStep => ({
  platform: "windows",
  label: "Windows (WSL)",
  instructions:
    "On this computer, open PowerShell, paste these commands, and press Enter.",
  command: `wsl.exe -e bash -lc 'systemctl --user restart ${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME}'
wsl.exe -e bash -lc 'systemctl --user status ${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME}'`,
  note: "AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe.",
});

const REVIVE_STEP_BUILDERS: Readonly<
  Record<
    AgentWitchReviveKnownPlatform,
    (input: AgentWitchReviveStepsInput) => AgentWitchReviveStep
  >
> = {
  mac: buildMacReviveStep,
  linux: buildLinuxReviveStep,
  windows: buildWindowsReviveStep,
};

const ALL_REVIVE_PLATFORMS: readonly AgentWitchReviveKnownPlatform[] = [
  "mac",
  "linux",
  "windows",
];

/**
 * Revive / reconnect help for the AgentWitch client on this computer.
 * Known OS → one step; unknown OS → one step per supported OS (neutral fallback).
 */
export const buildAgentWitchReviveSteps = (
  input: AgentWitchReviveStepsInput,
): readonly AgentWitchReviveStep[] => {
  const platforms =
    input.platform === "unknown" ? ALL_REVIVE_PLATFORMS : [input.platform];
  return platforms.map((platform) => REVIVE_STEP_BUILDERS[platform](input));
};
