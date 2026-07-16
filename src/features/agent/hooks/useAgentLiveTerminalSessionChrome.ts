"use client";

import { useEffect, useRef, type RefObject } from "react";

import { isAgentLiveTerminalSessionActive } from "@/features/agent/utils/isAgentLiveTerminalSessionActive";
import { focusAgentLiveTerminalSection } from "@/features/agent/utils/scrollAgentLiveTerminalIntoView";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const isConnectionLost = (status: WsTestConnectionStatus): boolean =>
  status === "disconnected" || status === "error";

export const useAgentLiveTerminalSessionChrome = (input: {
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly finishSession: () => void;
}): {
  readonly isSessionActive: boolean;
} => {
  const wasSessionActiveRef = useRef(false);
  const {
    terminalSectionRef,
    sessionWriterAgent,
    connectionStatus,
    finishSession,
  } = input;
  const isSessionActive = isAgentLiveTerminalSessionActive(sessionWriterAgent);

  useEffect(() => {
    if (isSessionActive && !wasSessionActiveRef.current) {
      requestAnimationFrame(() => {
        focusAgentLiveTerminalSection(terminalSectionRef.current);
      });
    }

    wasSessionActiveRef.current = isSessionActive;
  }, [isSessionActive, terminalSectionRef]);

  useEffect(() => {
    if (isSessionActive && isConnectionLost(connectionStatus)) {
      finishSession();
    }
  }, [connectionStatus, finishSession, isSessionActive]);

  return { isSessionActive };
};
