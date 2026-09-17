/**
 * Bridge adapter bindings for Mac lifecycle helpers still rooted in
 * `scripts/` shims (full slice move is incremental).
 */
export { ensureAgentWitchCoupledWakeClientHealth } from "../../../scripts/ensureAgentWitchCoupledWakeClientHealth";
export {
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
} from "../../../scripts/reviveAgentWitchWebSocket";
export {
  buildAgentWitchWatchdogStatusResponse,
  type AgentWitchWatchdogStatusResponse,
} from "../../../scripts/buildAgentWitchWatchdogStatus";
export {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "../../../scripts/agentWitchWatchdogLog";
