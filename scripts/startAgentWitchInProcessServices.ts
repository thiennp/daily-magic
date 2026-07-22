import type http from "node:http";

import {
  AGENT_WITCH_IN_PROCESS_SCHEDULER_INTERVAL_MS,
  AGENT_WITCH_IN_PROCESS_WATCHDOG_INTERVAL_MS,
} from "./agentWitchInProcessServices.constants";
import { startAgentWitchWakeServer } from "./agent-witch-wake-server";
import { reviveAgentWitchWebSocket } from "./reviveAgentWitchWebSocket";
import { tickAgentWitchScheduledAutomations } from "./tickAgentWitchScheduledAutomations";

export interface AgentWitchInProcessServicesHandle {
  readonly wakeServer: http.Server;
  readonly stop: () => void;
}

export const startAgentWitchInProcessServices =
  async (): Promise<AgentWitchInProcessServicesHandle> => {
    const wakeServer = await startAgentWitchWakeServer();

    void tickAgentWitchScheduledAutomations();
    void reviveAgentWitchWebSocket({ skipLog: true });

    const schedulerTimer = setInterval(() => {
      void tickAgentWitchScheduledAutomations();
    }, AGENT_WITCH_IN_PROCESS_SCHEDULER_INTERVAL_MS);

    const watchdogTimer = setInterval(() => {
      void reviveAgentWitchWebSocket({ skipLog: true });
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
