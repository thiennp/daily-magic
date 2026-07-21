import type WebSocket from "ws";

import { AGENT_RUN_HEARTBEAT_INTERVAL_MS } from "./agentWitchRunHeartbeat.constant";

const runHeartbeatTimers = new Map<string, NodeJS.Timeout>();

export const stopRunHeartbeat = (agentRunId: string): void => {
  const timer = runHeartbeatTimers.get(agentRunId);
  if (timer !== undefined) {
    clearInterval(timer);
    runHeartbeatTimers.delete(agentRunId);
  }
};

const sendRunHeartbeatMessage = (
  socket: WebSocket,
  agentRunId: string,
): void => {
  if (socket.readyState !== 1) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: "run.heartbeat",
      payload: { agentRunId },
    }),
  );
};

/**
 * Emit run.heartbeat while isAlive() stays true.
 * Stops the timer when the process is gone; callers still finish via onExit.
 */
export const startRunHeartbeat = (
  socket: WebSocket,
  agentRunId: string,
  isAlive: () => boolean,
): void => {
  stopRunHeartbeat(agentRunId);

  const tick = (): void => {
    if (!isAlive()) {
      stopRunHeartbeat(agentRunId);
      return;
    }
    sendRunHeartbeatMessage(socket, agentRunId);
  };

  tick();
  runHeartbeatTimers.set(
    agentRunId,
    setInterval(tick, AGENT_RUN_HEARTBEAT_INTERVAL_MS),
  );
};

export const clearRunHeartbeatTimersForTests = (): void => {
  for (const agentRunId of [...runHeartbeatTimers.keys()]) {
    stopRunHeartbeat(agentRunId);
  }
};
