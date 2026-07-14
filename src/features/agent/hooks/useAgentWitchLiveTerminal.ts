"use client";

import { useCallback, useState } from "react";

import {
  sendAgentRunInputResponse,
  type AgentRunInputRequest,
} from "@/features/dispatch/utils/agentRunInputSocket";
import {
  beginAgentLiveTerminalSession,
  initialAgentLiveTerminalState,
  reduceAgentLiveTerminalMessage,
  type AgentLiveTerminalState,
  type AgentLiveTerminalStatus,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";

export function useAgentWitchLiveTerminal(socketRef: {
  readonly current: WebSocket | null;
}): {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly beginSession: () => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly submitInput: (response: string) => void;
  readonly dismissInput: () => void;
} {
  const [state, setState] = useState<AgentLiveTerminalState>(
    initialAgentLiveTerminalState,
  );

  const beginSession = useCallback(() => {
    setState(beginAgentLiveTerminalSession());
  }, []);

  const applySocketMessage = useCallback((raw: string) => {
    try {
      const parsed: unknown = JSON.parse(raw);
      setState((current) => reduceAgentLiveTerminalMessage(current, parsed));
    } catch {
      return;
    }
  }, []);

  const submitInput = useCallback(
    (response: string) => {
      const trimmedResponse = response.trim();
      const socket = socketRef.current;
      const agentRunId = state.pendingInput?.agentRunId;

      if (
        agentRunId === undefined ||
        socket === null ||
        trimmedResponse.length === 0 ||
        socket.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      sendAgentRunInputResponse(socket, agentRunId, trimmedResponse);
      setState((current) => ({
        ...current,
        pendingInput: null,
        output: `${current.output}\n$ answer sent — continuing…\n`,
        status: "streaming",
      }));
    },
    [socketRef, state.pendingInput?.agentRunId],
  );

  const dismissInput = useCallback(() => {
    setState((current) => ({
      ...current,
      pendingInput: null,
    }));
  }, []);

  return {
    output: state.output,
    status: state.status,
    pendingInput: state.pendingInput,
    beginSession,
    applySocketMessage,
    submitInput,
    dismissInput,
  };
}
