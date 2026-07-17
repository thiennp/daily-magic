"use client";

import { useEffect, useRef, type RefObject } from "react";

import { isAgentLiveTerminalSessionActive } from "@/features/agent/utils/isAgentLiveTerminalSessionActive";
import { focusAgentLiveTerminalSection } from "@/features/agent/utils/scrollAgentLiveTerminalIntoView";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useAgentLiveTerminalSessionChrome = (input: {
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
}): {
  readonly isSessionActive: boolean;
} => {
  const wasSessionActiveRef = useRef(false);
  const { terminalSectionRef, sessionWriterAgent } = input;
  const isSessionActive = isAgentLiveTerminalSessionActive(sessionWriterAgent);

  useEffect(() => {
    if (isSessionActive && !wasSessionActiveRef.current) {
      requestAnimationFrame(() => {
        focusAgentLiveTerminalSection(terminalSectionRef.current);
      });
    }

    wasSessionActiveRef.current = isSessionActive;
  }, [isSessionActive, terminalSectionRef]);

  return { isSessionActive };
};
