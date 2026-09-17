import {
  kickstartAgentWitchLaunchAgent,
  listAgentWitchLaunchTargets,
} from "@agent-witch/install-macos-launch";
import {
  buildAgentWitchSelfUpdateStatus,
  readAgentWitchSelfUpdateLogs,
  runAgentWitchSelfUpdate,
} from "@agent-witch/install-self-update";
import { runAgentWitchUninstallLocal } from "@agent-witch/install-uninstall";

import { ensureAgentWitchCoupledWakeClientHealth } from "../../../scripts/ensureAgentWitchCoupledWakeClientHealth";
import { spawnAgentWitchClient } from "../../../scripts/spawnAgentWitchClient";
import {
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
} from "../../../scripts/reviveAgentWitchWebSocket";
import {
  buildAgentWitchWatchdogStatusResponse,
  type AgentWitchWatchdogStatusResponse,
} from "../../../scripts/buildAgentWitchWatchdogStatus";
import {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "../../../scripts/agentWitchWatchdogLog";

export {
  ensureAgentWitchCoupledWakeClientHealth,
  kickstartAgentWitchLaunchAgent,
  listAgentWitchLaunchTargets,
  spawnAgentWitchClient,
  reviveAgentWitchWebSocket,
  buildAgentWitchWatchdogStatusResponse,
  readAgentWitchWatchdogLogs,
  buildAgentWitchSelfUpdateStatus,
  runAgentWitchSelfUpdate,
  readAgentWitchSelfUpdateLogs,
  runAgentWitchUninstallLocal,
};

export type {
  AgentWitchReviveResult,
  AgentWitchWatchdogStatusResponse,
  AgentWitchWatchdogLogEntry,
};
