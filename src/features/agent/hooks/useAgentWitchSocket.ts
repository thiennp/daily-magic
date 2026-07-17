"use client";

import { useRef, useState } from "react";

import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { useAgentWitchDashboardSocketConnection } from "@/features/agent/hooks/useAgentWitchDashboardSocketConnection";
import { useAgentWitchLiveTerminal } from "@/features/agent/hooks/useAgentWitchLiveTerminal";
import { useAgentWitchPromptDispatch } from "@/features/agent/hooks/useAgentWitchPromptDispatch";
import { useAgentWitchWriterSessionStart } from "@/features/agent/hooks/useAgentWitchWriterSessionStart";
import { useWriterSessionPromptContinuation } from "@/features/agent/hooks/useWriterSessionPromptContinuation";
import { resolveInitialConnectionStatus } from "@/features/agent/utils/connectAgentWitchDashboardSocket";
import type { AgentWitchSocketDisplay } from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: AgentWitchSocketDisplay;
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalPendingCommandLine: string | null;
  readonly liveTerminalRunId: string | null;
  readonly liveTerminalPendingInput: AgentRunInputRequest | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
  readonly finishLiveTerminalSession: () => void;
  readonly submitLiveTerminalInput: (response: string) => void;
  readonly dismissLiveTerminalInput: () => void;
  readonly sendClaudePrompt: (
    prompt: string,
    options?: {
      readonly writerAgent: HarnessWriterAgent;
      readonly targetUserId?: string;
      readonly groupId?: string;
      readonly capabilityId?: string;
      readonly targetDeviceId?: string;
    },
  ) => void;
  readonly startWriterSession: (
    writerAgent: HarnessWriterAgent,
    targetDeviceId?: string,
  ) => void;
}

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
  const terminal = useAgentWitchLiveTerminal(socketRef);
  const connectionStatus =
    connectionLab?.connectionStatus ?? liveConnectionStatus;
  const promptContinuation = useWriterSessionPromptContinuation({
    sessionWriterAgent: terminal.sessionWriterAgent,
    finishSessionBase: terminal.finishSession,
  });

  useAgentWitchDashboardSocketConnection({
    connectionLab,
    applySocketMessage: terminal.applySocketMessage,
    setLastResponse,
    setLiveConnectionStatus,
    socketRef,
  });

  const dispatchClaudePrompt = useAgentWitchPromptDispatch({
    socketRef,
    connectionLab,
    isSessionContinuation: promptContinuation.isSessionContinuation,
    beginSession: terminal.beginSession,
    applySocketMessage: terminal.applySocketMessage,
    setLastResponse,
  });
  const startWriterSessionBase = useAgentWitchWriterSessionStart({
    socketRef,
    connectionLab,
    beginSession: terminal.beginSession,
    applySocketMessage: terminal.applySocketMessage,
    setLastResponse,
  });

  return {
    connectionStatus,
    lastResponse,
    liveTerminalOutput: terminal.output,
    liveTerminalStatus: terminal.status,
    liveTerminalPendingCommandLine: terminal.pendingCommandLine,
    liveTerminalRunId: terminal.activeRunId,
    liveTerminalPendingInput: terminal.pendingInput,
    sessionWriterAgent: terminal.sessionWriterAgent,
    sessionDeviceId: terminal.sessionDeviceId,
    finishLiveTerminalSession: promptContinuation.finishLiveTerminalSession,
    submitLiveTerminalInput: terminal.submitInput,
    dismissLiveTerminalInput: terminal.dismissInput,
    sendClaudePrompt:
      promptContinuation.bindSendClaudePrompt(dispatchClaudePrompt),
    startWriterSession: promptContinuation.bindStartWriterSession(
      startWriterSessionBase,
    ),
  };
}
