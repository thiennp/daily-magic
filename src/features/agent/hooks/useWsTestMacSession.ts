"use client";

import { useRef, type RefObject } from "react";

import { useAgentLiveTerminalFeedback } from "@/features/agent/hooks/useAgentLiveTerminalFeedback";
import { useAgentLiveTerminalSessionChrome } from "@/features/agent/hooks/useAgentLiveTerminalSessionChrome";
import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { resolveSessionErrorMessage } from "@/features/agent/utils/resolveSessionErrorMessage";
import type { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";

export const useWsTestMacSession = (input: {
  readonly socket: ReturnType<typeof useAgentWitchSocket>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly sessionTargets: ReturnType<typeof resolveAgentSessionTargets>;
  readonly enqueueRun: ReturnType<typeof useAgentRunQueue>["enqueueRun"];
}): {
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly isSessionActive: boolean;
  readonly sessionErrorMessage: string | null;
  readonly terminalFeedback: ReturnType<typeof useAgentLiveTerminalFeedback>;
} => {
  const terminalSectionRef = useRef<HTMLElement>(null);
  const { isSessionActive: isWriterSessionActive } =
    useAgentLiveTerminalSessionChrome({
      terminalSectionRef,
      sessionWriterAgent: input.socket.sessionWriterAgent,
    });
  const isSessionActive =
    isWriterSessionActive || input.socket.macShell.status !== "idle";
  const terminalFeedback = useAgentLiveTerminalFeedback({
    status: input.socket.liveTerminalStatus,
    connectionStatus: input.socket.connectionStatus,
    pendingInput: input.socket.liveTerminalPendingInput,
    sessionWriterAgent: input.socket.sessionWriterAgent,
    sessionDeviceId: input.socket.sessionDeviceId,
    activeDeviceId: input.sessionTargets.activeDeviceId,
    activeWriterAgent: input.sessionTargets.activeWriterAgent,
    composer: input.composer,
    sendClaudePrompt: input.socket.sendClaudePrompt,
    submitInput: input.socket.submitLiveTerminalInput,
    enqueueRun: input.enqueueRun,
  });
  const sessionErrorMessage = resolveSessionErrorMessage({
    liveTerminalStatus: input.socket.liveTerminalStatus,
    isSessionActive,
    lastResponse: input.socket.lastResponse,
  });

  return {
    terminalSectionRef,
    isSessionActive,
    sessionErrorMessage,
    terminalFeedback,
  };
};
