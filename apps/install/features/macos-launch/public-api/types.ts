/**
 * AWI slice `macos-launch` — LaunchAgent labels and kickstart/bootout contracts.
 */

export interface KickstartLaunchAgentResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchLaunchTarget {
  readonly profileEmail: string | null;
  readonly launchAgentLabel: string;
}

export type { ActiveMacOsConsoleUserInput } from "../internal/core/isActiveMacOsConsoleUser";
