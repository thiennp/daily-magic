import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";

/**
 * AWL "connected" should match cloud presence: a fresh health snapshot means
 * the Mac client received a recent `system.ack` on an open socket (not merely
 * TCP/WebSocket open before `agent.register` completes).
 */
export const resolveAgentWitchLocalWsConnected = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly socketOpen: boolean;
    readonly staleAfterMs?: number;
    readonly nowMs?: number;
  },
): boolean => {
  if (!input.socketOpen) {
    return false;
  }

  const health = readAgentWitchConnectionHealth(layout);
  if (health === null) {
    return false;
  }

  return !isAgentWitchConnectionHealthStale(
    health,
    input.staleAfterMs ?? AGENT_WITCH_CONNECTION_STALE_MS,
    input.nowMs,
  );
};
