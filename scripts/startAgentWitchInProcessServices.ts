import type http from "node:http";

import {
  AGENT_WITCH_IN_PROCESS_SCHEDULER_INTERVAL_MS,
  AGENT_WITCH_IN_PROCESS_WATCHDOG_INTERVAL_MS,
} from "./agentWitchInProcessServices.constants";
import { startAgentWitchWakeServer } from "./agent-witch-wake-server";
import { renewAgentWitchMachineLease } from "./claimAgentWitchMachineLease";
import { tickAgentWitchScheduledAutomations } from "./tickAgentWitchScheduledAutomations";

export interface AgentWitchInProcessServicesHandle {
  readonly wakeServer: http.Server;
  readonly stop: () => void;
}

export interface StartAgentWitchInProcessServicesInput {
  /**
   * When set, called on the watchdog interval. The implementation should
   * reconnect only when connection health is stale (not on every tick).
   */
  readonly reconnectWebSockets?: () => void;
  readonly onLostMachineLease?: () => void;
}

export const startAgentWitchInProcessServices = async (
  input: StartAgentWitchInProcessServicesInput = {},
): Promise<AgentWitchInProcessServicesHandle> => {
  const wakeServer = await startAgentWitchWakeServer();

  void tickAgentWitchScheduledAutomations();

  const schedulerTimer = setInterval(() => {
    void tickAgentWitchScheduledAutomations();
  }, AGENT_WITCH_IN_PROCESS_SCHEDULER_INTERVAL_MS);

  const watchdogTimer = setInterval(() => {
    const lease = renewAgentWitchMachineLease();
    if (!lease.ok) {
      input.onLostMachineLease?.();
      return;
    }
    input.reconnectWebSockets?.();
  }, AGENT_WITCH_IN_PROCESS_WATCHDOG_INTERVAL_MS);

  return {
    wakeServer,
    stop: () => {
      clearInterval(schedulerTimer);
      clearInterval(watchdogTimer);
      wakeServer.close();
    },
  };
};
