import {
  kickstartAgentWitchLaunchAgent,
  listAgentWitchLaunchTargets,
  spawnAgentWitchClient,
} from "@agent-witch/install-macos-launch";
import {
  buildAgentWitchSelfUpdateStatus,
  readAgentWitchSelfUpdateLogs,
  runAgentWitchSelfUpdate,
} from "@agent-witch/install-self-update";
import { runAgentWitchUninstallLocal } from "@agent-witch/install-uninstall";

import {
  buildAgentWitchWatchdogStatusResponse,
  ensureAgentWitchCoupledWakeClientHealth,
  readAgentWitchWatchdogLogs,
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
  type AgentWitchWatchdogLogEntry,
  type AgentWitchWatchdogStatusResponse,
} from "./macAgentLifecycleBindings";

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
