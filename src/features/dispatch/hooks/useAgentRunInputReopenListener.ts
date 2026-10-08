"use client";

import { useEffect } from "react";

import { AGENT_WITCH_REOPEN_RUN_INPUT_EVENT } from "@/features/dispatch/utils/agentRunInputModalEvents";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

/**
 * afae8216: an explicit "Open question" click (floater or Home row) always
 * reopens the input modal; only its Send answers the agent.
 */
export const useAgentRunInputReopenListener = (
  onReopen: (request: AgentRunInputRequest) => void,
): void => {
  useEffect(() => {
    const handleReopen = (event: Event): void => {
      onReopen((event as CustomEvent<AgentRunInputRequest>).detail);
    };
    window.addEventListener(AGENT_WITCH_REOPEN_RUN_INPUT_EVENT, handleReopen);
    return () => {
      window.removeEventListener(
        AGENT_WITCH_REOPEN_RUN_INPUT_EVENT,
        handleReopen,
      );
    };
  }, [onReopen]);
};
