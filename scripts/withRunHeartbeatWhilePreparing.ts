import type WebSocket from "ws";

import { startRunHeartbeat, stopRunHeartbeat } from "./agentWitchRunHeartbeat";

/**
 * 5ca01f06: while ensure-writer.sh prepared a tool (up to 120 s) the run sent
 * no run.heartbeat, so the floater said "Lost connection to your computer"
 * after about a minute although the computer was fine. Keep the run's
 * heartbeat going while preparing.
 */
export const withRunHeartbeatWhilePreparing = async <T>(
  socket: WebSocket,
  agentRunId: string | undefined,
  work: () => Promise<T>,
): Promise<T> => {
  if (agentRunId === undefined) {
    return work();
  }
  const state = { preparing: true };
  startRunHeartbeat(socket, agentRunId, () => state.preparing);
  try {
    return await work();
  } finally {
    state.preparing = false;
    stopRunHeartbeat(agentRunId);
  }
};
