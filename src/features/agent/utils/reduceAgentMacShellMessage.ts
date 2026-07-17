import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export type AgentMacShellStatus =
  "idle" | "opening" | "open" | "closed" | "error";

export interface AgentMacShellState {
  readonly status: AgentMacShellStatus;
  readonly shellSessionId: string | null;
  readonly canWrite: boolean;
  readonly latestChunk: string | null;
  readonly chunkSeq: number;
  readonly clearToken: number;
  readonly errorMessage: string | null;
}

export const initialAgentMacShellState = (): AgentMacShellState => ({
  status: "idle",
  shellSessionId: null,
  canWrite: true,
  latestChunk: null,
  chunkSeq: 0,
  clearToken: 0,
  errorMessage: null,
});

export const reduceAgentMacShellMessage = (
  state: AgentMacShellState,
  raw: string,
): AgentMacShellState => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || !("type" in parsed)) {
      return state;
    }
    const message = parsed as {
      readonly type: string;
      readonly payload?: Record<string, unknown>;
    };
    const payload = message.payload ?? {};

    if (
      message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK &&
      typeof payload.shellSessionId === "string" &&
      payload.opened === true
    ) {
      return {
        ...state,
        status: "opening",
        shellSessionId: payload.shellSessionId,
        canWrite: true,
      };
    }

    if (
      message.type === AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPENED &&
      typeof payload.shellSessionId === "string"
    ) {
      return {
        ...state,
        status: "open",
        shellSessionId: payload.shellSessionId,
        canWrite: state.canWrite,
      };
    }

    if (
      message.type === AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA &&
      typeof payload.chunk === "string"
    ) {
      return {
        ...state,
        status: "open",
        latestChunk: payload.chunk,
        chunkSeq: state.chunkSeq + 1,
        shellSessionId:
          typeof payload.shellSessionId === "string"
            ? payload.shellSessionId
            : state.shellSessionId,
      };
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSED) {
      return {
        ...state,
        status: "closed",
        shellSessionId: null,
        latestChunk: null,
      };
    }
  } catch {
    return state;
  }
  return state;
};
