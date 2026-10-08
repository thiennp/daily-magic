import { takeTerminalStreamsForReRegister } from "./agentWitchTerminalStreamState";

export const INACTIVE_TERMINAL_STREAM_ERROR_MESSAGE =
  "Terminal stream is not active for this run.";

/**
 * r323: a reconnect (or a server restart) drops the server's in-memory stream
 * slot, so every live run's stream is started again on the new socket.
 * Returns how many streams were re-registered.
 */
export const reRegisterAgentWitchTerminalStreams = (
  send: (message: Record<string, unknown>) => void,
  requestId?: string,
): number => {
  const frames = takeTerminalStreamsForReRegister(requestId);
  for (const frame of frames) {
    send({ ...frame });
  }
  return frames.length;
};

export const isInactiveTerminalStreamError = (
  parsed: Record<string, unknown>,
): boolean => {
  if (parsed.type !== "system.error") {
    return false;
  }
  const payload = parsed.payload;
  return (
    typeof payload === "object" &&
    payload !== null &&
    "errorMessage" in payload &&
    payload.errorMessage === INACTIVE_TERMINAL_STREAM_ERROR_MESSAGE
  );
};
