import { ensureAgentWitchCoupledWakeClientHealth } from "../../../scripts/ensureAgentWitchCoupledWakeClientHealth";
import { kickstartAgentWitchLaunchAgent } from "../../../scripts/kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "../../../scripts/listAgentWitchLaunchTargets";
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
import {
  buildAgentWitchSelfUpdateStatus,
  runAgentWitchSelfUpdate,
} from "../../../scripts/agentWitchSelfUpdate";
import { readAgentWitchSelfUpdateLogs } from "../../../scripts/agentWitchSelfUpdateLog";
import { runAgentWitchUninstallLocal } from "../../../scripts/agentWitchUninstallLocal";

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
