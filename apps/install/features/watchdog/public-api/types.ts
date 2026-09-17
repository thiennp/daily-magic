/**
 * AWI slice `watchdog` — reinstall cooldown state and revive timing constants.
 */

import { AWI_INSTALL_ROOT_FILES } from "@agent-witch/install-layout/types";

export const AGENT_WITCH_WATCHDOG_REINSTALL_STATE_FILE_NAME =
  AWI_INSTALL_ROOT_FILES.watchdogReinstallState;

export const AGENT_WITCH_WATCHDOG_REINSTALL_COOLDOWN_MS = 15 * 60 * 1000;

export const AGENT_WITCH_REVIVE_VERIFY_DELAY_MS = 3_000;

export interface AgentWitchWatchdogReinstallState {
  readonly lastAttemptAt: string;
}

export type AgentWitchWatchdogReviveReason =
  "healthy" | "not_running" | "stale_connection";

export interface AgentWitchWatchdogReviveTarget {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly revived: boolean;
  readonly reason: AgentWitchWatchdogReviveReason;
  readonly errorMessage?: string;
}

export interface AgentWitchWatchdogReinstallAttemptResult {
  readonly attempted: boolean;
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly targets: readonly AgentWitchWatchdogReviveTarget[];
}
