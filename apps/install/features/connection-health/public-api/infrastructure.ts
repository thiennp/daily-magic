/**
 * AWI slice `connection-health` — hub connection health snapshot on disk.
 */
export {
  clearAgentWitchConnectionHealth,
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  resolveAgentWitchConnectionHealthPath,
  writeAgentWitchConnectionHealth,
} from "../internal/core/agentWitchConnectionHealth";

export { resolveAgentWitchLocalWsConnected } from "../internal/core/resolveAgentWitchLocalWsConnected";
export { shouldReviveAgentWitchWebSocketFromHealth } from "../internal/core/shouldReviveAgentWitchWebSocketFromHealth";

export {
  AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME,
  AGENT_WITCH_CONNECTION_STALE_MS,
  type AgentWitchConnectionHealth,
} from "../internal/core/agentWitchConnectionHealth.constants";

export {
  AGENT_WITCH_DEFAULT_MAX_DELAY_MS,
  AGENT_WITCH_NOT_LINKED_RETRY_MS,
  AGENT_WITCH_SERVER_DOWN_MAX_DELAY_MS,
  classifyAgentWitchDisconnect,
  computeAgentWitchReconnectDelayMs,
  describeAgentWitchDisconnectKind,
  type AgentWitchDisconnectKind,
  type AgentWitchDisconnectSignal,
} from "../internal/core/agentWitchDisconnect";
export {
  clearAgentWitchLastDisconnect,
  readAgentWitchLastDisconnect,
  resolveAgentWitchLastDisconnectPath,
  writeAgentWitchLastDisconnect,
  type AgentWitchLastDisconnect,
} from "../internal/core/agentWitchLastDisconnect";
