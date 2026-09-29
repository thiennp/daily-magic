import type { AgentWitchConnectionHealth } from "./agentWitchConnectionHealth.constants";
import { isAgentWitchConnectionHealthStale } from "./agentWitchConnectionHealth";

/**
 * Watchdog / AWL "Revive" should reconnect when health is missing or stale, but not
 * while the Mac socket is open waiting for the first `system.ack` (bundle 164+).
 */
export const shouldReviveAgentWitchWebSocketFromHealth = (
  health: AgentWitchConnectionHealth | null,
  input: {
    readonly socketOpen: boolean;
    readonly staleAfterMs: number;
    readonly nowMs?: number;
  },
): boolean => {
  if (
    health !== null &&
    !isAgentWitchConnectionHealthStale(health, input.staleAfterMs, input.nowMs)
  ) {
    return false;
  }

  if (health === null && input.socketOpen) {
    return false;
  }

  return true;
};
