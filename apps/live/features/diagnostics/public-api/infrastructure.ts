export {
  appendAgentWitchLocalTraffic,
  clearAgentWitchLocalTraffic,
  readAgentWitchLocalTraffic,
  type AgentWitchLocalTrafficEntry,
} from "../internal/core/agentWitchLocalTrafficLog";

export {
  clearAgentWitchLocalWsTrace,
  readAgentWitchLocalWsTrace,
  recordAgentWitchLocalTraceEvent,
  recordAgentWitchWsTraceFromObject,
  type AgentWitchLocalWsTraceEntry,
} from "../internal/core/agentWitchLocalWsTraceLog";

export {
  clearAgentWitchErrorLog,
  readAgentWitchErrorLogTail,
} from "../internal/core/readAgentWitchErrorLogTail";
