import type WebSocket from "ws";

import { AGENT_RUN_HEARTBEAT_INTERVAL_MS } from "./agentWitchRunHeartbeat.constant";

const runHeartbeatTimers = new Map<string, NodeJS.Timeout>();

export interface StartRunHeartbeatOptions {
  readonly awaitingInput?: boolean;
}

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
  awaitingInput: boolean,
): void => {
  if (socket.readyState !== 1) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: "run.heartbeat",
      payload: {
        agentRunId,
        ...(awaitingInput ? { awaitingInput: true } : {}),
      },
    }),
  );
};

/**
 * Emit run.heartbeat while isAlive() stays true.
 * Stops the timer when the process/session is gone; callers still finish via onExit.
 */
export const startRunHeartbeat = (
  socket: WebSocket,
  agentRunId: string,
  isAlive: () => boolean,
  options: StartRunHeartbeatOptions = {},
): void => {
  stopRunHeartbeat(agentRunId);
  const awaitingInput = options.awaitingInput === true;

  const tick = (): void => {
    if (!isAlive()) {
      stopRunHeartbeat(agentRunId);
      return;
    }
    sendRunHeartbeatMessage(socket, agentRunId, awaitingInput);
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
