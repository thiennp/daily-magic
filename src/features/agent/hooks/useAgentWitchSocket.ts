"use client";

import { useCallback, useRef, useState } from "react";

import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { useAgentWitchDashboardSocketConnection } from "@/features/agent/hooks/useAgentWitchDashboardSocketConnection";
import { useAgentMacShell } from "@/features/agent/hooks/useAgentMacShell";
import { useAgentWitchLiveTerminal } from "@/features/agent/hooks/useAgentWitchLiveTerminal";
import { useAgentWitchPromptDispatch } from "@/features/agent/hooks/useAgentWitchPromptDispatch";
import { useAgentWitchWriterSessionStart } from "@/features/agent/hooks/useAgentWitchWriterSessionStart";
import { useWriterSessionPromptContinuation } from "@/features/agent/hooks/useWriterSessionPromptContinuation";
import { applyAgentWitchSocketMessageBundle } from "@/features/agent/utils/applyAgentWitchSocketMessageBundle";
import { resolveInitialConnectionStatus } from "@/features/agent/utils/connectAgentWitchDashboardSocket";
import type { UseAgentWitchSocketResult } from "@/features/agent/types/UseAgentWitchSocketResult.type";
import type { AgentWitchSocketDisplay } from "@/lib/agentWitch/parseAgentWitchSocketDisplay";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export type { UseAgentWitchSocketResult };

export function useAgentWitchSocket(): UseAgentWitchSocketResult {
  const connectionLab = useConnectionLab();
  const socketRef = useRef<WebSocket | null>(null);
  const [liveConnectionStatus, setLiveConnectionStatus] =
    useState<WsTestConnectionStatus>(() =>
      resolveInitialConnectionStatus(
        connectionLab !== null,
        connectionLab?.connectionStatus,
      ),
    );
  const [lastResponse, setLastResponse] = useState<AgentWitchSocketDisplay>({
    text: "",
    isError: false,
  });
  const clearLastResponse = useCallback(() => {
    setLastResponse({ text: "", isError: false });
  }, []);
  const terminal = useAgentWitchLiveTerminal(socketRef);
  const macShell = useAgentMacShell(socketRef);
  const connectionStatus =
    connectionLab?.connectionStatus ?? liveConnectionStatus;
  const promptContinuation = useWriterSessionPromptContinuation({
    sessionWriterAgent: terminal.sessionWriterAgent,
    threadAlreadyStarted:
      terminal.status === "finished" ||
      terminal.status === "streaming" ||
      terminal.status === "error" ||
      terminal.status === "waiting_approval",
    finishSessionBase: terminal.finishSession,
  });

  const applySocketMessage = useCallback(
    (raw: string): void => {
      applyAgentWitchSocketMessageBundle({
        raw,
        applyTerminalMessage: terminal.applySocketMessage,
        applyShellMessage: macShell.applySocketMessage,
        attachShellSession: macShell.attachShellSession,
      });
    },
    [
      macShell.applySocketMessage,
      macShell.attachShellSession,
      terminal.applySocketMessage,
    ],
  );

  useAgentWitchDashboardSocketConnection({
    connectionLab,
    applySocketMessage,
    setLastResponse,
    setLiveConnectionStatus,
    socketRef,
  });

  const dispatchClaudePrompt = useAgentWitchPromptDispatch({
    socketRef,
    connectionLab,
    isSessionContinuation: promptContinuation.isSessionContinuation,
    beginSession: terminal.beginSession,
    applySocketMessage,
    setLastResponse,
  });
  const startWriterSessionBase = useAgentWitchWriterSessionStart({
    socketRef,
    connectionLab,
    beginSession: terminal.beginSession,
    applySocketMessage,
    setLastResponse,
  });

  return {
    connectionStatus,
    lastResponse,
    clearLastResponse,
    liveTerminalOutput: terminal.output,
    liveTerminalStatus: terminal.status,
    liveTerminalPendingCommandLine: terminal.pendingCommandLine,
    liveTerminalRunId: terminal.activeRunId,
    liveTerminalPendingInput: terminal.pendingInput,
    sessionWriterAgent: terminal.sessionWriterAgent,
    sessionDeviceId: terminal.sessionDeviceId,
    macShell,
    finishLiveTerminalSession: promptContinuation.finishLiveTerminalSession,
    stopLiveTerminalRun: terminal.stopRun,
    deleteLiveTerminalRun: terminal.deleteRun,
    submitLiveTerminalInput: terminal.submitInput,
    dismissLiveTerminalInput: terminal.dismissInput,
    sendClaudePrompt:
      promptContinuation.bindSendClaudePrompt(dispatchClaudePrompt),
    startWriterSession: promptContinuation.bindStartWriterSession(
      startWriterSessionBase,
    ),
  };
}
