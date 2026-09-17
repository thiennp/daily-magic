/**
 * AWI slice `connection-health` — hub connection health snapshot on disk.
 */
export {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
  resolveAgentWitchConnectionHealthPath,
  writeAgentWitchConnectionHealth,
} from "../internal/core/agentWitchConnectionHealth";

export {
  AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME,
  AGENT_WITCH_CONNECTION_STALE_MS,
  type AgentWitchConnectionHealth,
} from "../internal/core/agentWitchConnectionHealth.constants";
