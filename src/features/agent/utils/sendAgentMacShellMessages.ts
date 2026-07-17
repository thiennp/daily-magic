import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const sendShellSessionOpen = (
  socket: WebSocket | null,
  input: {
    readonly targetDeviceId?: string;
    readonly cols?: number;
    readonly rows?: number;
  },
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPEN,
      payload: {
        ...(input.targetDeviceId !== undefined
          ? { targetDeviceId: input.targetDeviceId }
          : {}),
        cols: input.cols ?? 120,
        rows: input.rows ?? 32,
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const sendShellSessionClose = (
  socket: WebSocket | null,
  shellSessionId: string,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSE,
      payload: { shellSessionId },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const sendShellSubscribe = (
  socket: WebSocket | null,
  shellSessionId: string,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SUBSCRIBE,
      payload: { shellSessionId },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const sendShellInput = (
  socket: WebSocket | null,
  shellSessionId: string,
  data: string,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_INPUT,
      payload: { shellSessionId, data },
      requestId: createAgentWitchRequestId(),
    }),
  );
};

export const sendShellResize = (
  socket: WebSocket | null,
  shellSessionId: string,
  cols: number,
  rows: number,
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_RESIZE,
      payload: { shellSessionId, cols, rows },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
