import { AGENT_WITCH_WAKE_BASE_URL } from "@/lib/agentWitch/requestAgentWitchWake";

export const buildAgentWitchWakeTerminalCommand = (): string =>
  `curl -fsS -X POST ${AGENT_WITCH_WAKE_BASE_URL}/wake`;
