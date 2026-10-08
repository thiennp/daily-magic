"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";

import { AGENT_WITCH_RUN_INPUT_ANSWERED_EVENT } from "@/features/dispatch/utils/announceAgentRunInputAnswered";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const clearAnsweredAgentLiveInput = (
  state: AgentLiveTerminalState,
  agentRunId: string,
): AgentLiveTerminalState =>
  state.pendingInput !== null && state.pendingInput.agentRunId === agentRunId
    ? { ...state, pendingInput: null }
    : state;

/** a6053d1c: an answer sent from any question modal clears the panel's ask. */
export const useClearAnsweredAgentLiveInput = (
  setState: Dispatch<SetStateAction<AgentLiveTerminalState>>,
): void => {
  useEffect(() => {
    const onAnswered = (event: Event): void => {
      const agentRunId = (event as CustomEvent<{ agentRunId?: unknown }>).detail
        ?.agentRunId;
      if (typeof agentRunId === "string" && agentRunId.length > 0) {
        setState((current) => clearAnsweredAgentLiveInput(current, agentRunId));
      }
    };
    window.addEventListener(AGENT_WITCH_RUN_INPUT_ANSWERED_EVENT, onAnswered);
    return () =>
      window.removeEventListener(
        AGENT_WITCH_RUN_INPUT_ANSWERED_EVENT,
        onAnswered,
      );
  }, [setState]);
};
