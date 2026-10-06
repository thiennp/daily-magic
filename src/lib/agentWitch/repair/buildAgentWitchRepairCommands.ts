import {
  buildAgentWitchUpdateInstallCommand,
  buildAgentWitchUpdateInstallScriptUrl,
} from "@/lib/agentWitch/buildAgentWitchUpdateInstallCommand";

export interface AgentWitchRepairCommands {
  readonly scriptUrl: string;
  /** Paste into Terminal on macOS. */
  readonly macos: string;
  /** Paste into a Linux shell (also works inside a WSL Ubuntu tab). */
  readonly linux: string;
  /** Paste into Windows PowerShell or cmd; runs the Linux repair in the default WSL distro. */
  readonly windows: string;
}

/**
 * Per-OS update/repair one-liners. All run /install/agent-witch-update.sh (the URL
 * the Repair manually panel shows); Windows mirrors the tray's `wsl.exe -e bash -lc`.
 */
export const buildAgentWitchRepairCommands = (
  origin: string,
): AgentWitchRepairCommands => {
  const scriptUrl = buildAgentWitchUpdateInstallScriptUrl(origin);
  const unixCommand = buildAgentWitchUpdateInstallCommand(origin);

  return {
    scriptUrl,
    macos: unixCommand,
    linux: unixCommand,
    windows: `wsl.exe -e bash -lc "set -o pipefail; curl -fsSL ${scriptUrl} | bash"`,
  };
};
