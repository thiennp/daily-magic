"use client";

import { useEffect, useRef, useState } from "react";

import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { useAgentWitchLiveTerminal } from "@/features/agent/hooks/useAgentWitchLiveTerminal";
import { useAgentWitchPromptDispatch } from "@/features/agent/hooks/useAgentWitchPromptDispatch";
import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";
import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { resolveInitialConnectionStatus } from "@/features/agent/utils/connectAgentWitchDashboardSocket";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: AgentWitchSocketDisplay;
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
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
  const {
    output: liveTerminalOutput,
    status: liveTerminalStatus,
    activeRunId: liveTerminalRunId,
    pendingInput: liveTerminalPendingInput,
    sessionWriterAgent,
    sessionDeviceId,
    beginSession,
    finishSession,
    applySocketMessage,
    submitInput: submitLiveTerminalInput,
    dismissInput: dismissLiveTerminalInput,
  } = useAgentWitchLiveTerminal(socketRef);
  const connectionStatus =
    connectionLab?.connectionStatus ?? liveConnectionStatus;

  useEffect(() => {
    if (connectionLab !== null) {
      return;
    }

    return subscribeAgentWitchDashboardSocket({
      onStatusChange: setLiveConnectionStatus,
      onMessage: (raw) => {
        trackOnboardingFromAgentWitchSocketMessage(raw);
        syncAgentRunLocalCacheFromSocket(raw);
        applySocketMessage(raw);
        setLastResponse(parseAgentWitchSocketDisplay(raw));
      },
      onSocketChange: (socket) => {
        socketRef.current = socket;
      },
    });
  }, [applySocketMessage, connectionLab]);

  const sendClaudePrompt = useAgentWitchPromptDispatch({
    socketRef,
    connectionLab,
    isSessionContinuation: () => sessionWriterAgent !== null,
    beginSession,
    applySocketMessage,
    setLastResponse,
  });

  return {
    connectionStatus,
    lastResponse,
    liveTerminalOutput,
    liveTerminalStatus,
    liveTerminalRunId,
    liveTerminalPendingInput,
    sessionWriterAgent,
    sessionDeviceId,
    finishLiveTerminalSession: finishSession,
    submitLiveTerminalInput,
    dismissLiveTerminalInput,
    sendClaudePrompt,
  };
}
