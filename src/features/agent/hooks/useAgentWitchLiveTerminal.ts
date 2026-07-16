"use client";

import { useCallback, useEffect, useState } from "react";

import {
  loadPersistedAgentLiveTerminalState,
  persistAgentLiveTerminalState,
} from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { type AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { submitAgentLiveTerminalInput } from "@/features/agent/utils/submitAgentLiveTerminalInput";
import { sendWriterSessionEnd } from "@/features/agent/utils/sendWriterSessionEnd";
import {
  beginAgentLiveTerminalSession,
  continueAgentLiveTerminalSession,
  finishAgentLiveTerminalSession,
  initialAgentLiveTerminalState,
  reduceAgentLiveTerminalMessage,
  shouldContinueAgentLiveTerminalThread,
  type AgentLiveTerminalState,
  type AgentLiveTerminalStatus,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export function useAgentWitchLiveTerminal(socketRef: {
  readonly current: WebSocket | null;
}): {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId: string | null;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
  readonly beginSession: (
    commandLine: string,
    writerAgent: HarnessWriterAgent,
    deviceId?: string,
  ) => void;
  readonly finishSession: () => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly submitInput: (response: string) => void;
  readonly dismissInput: () => void;
} {
  const [state, setState] = useState<AgentLiveTerminalState>(() =>
    typeof window === "undefined"
      ? initialAgentLiveTerminalState()
      : loadPersistedAgentLiveTerminalState(),
  );

  useEffect(() => {
    persistAgentLiveTerminalState(state);
  }, [state]);

  const beginSession = useCallback(
    (
      commandLine: string,
      writerAgent: HarnessWriterAgent,
      deviceId?: string,
    ) => {
      setState((current) =>
        shouldContinueAgentLiveTerminalThread(current)
          ? continueAgentLiveTerminalSession(current, commandLine)
          : beginAgentLiveTerminalSession(
              commandLine,
              writerAgent,
              deviceId && deviceId.length > 0 ? deviceId : null,
            ),
      );
    },
    [],
  );

  const finishSession = useCallback(() => {
    setState((current) => {
      if (current.sessionWriterAgent !== null) {
        sendWriterSessionEnd(socketRef.current, current.sessionWriterAgent);
      }

      return finishAgentLiveTerminalSession();
    });
  }, [socketRef]);

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
      setState((current) => {
        const nextState = submitAgentLiveTerminalInput(
          socketRef.current,
          current,
          response,
        );
        return nextState ?? current;
      });
    },
    [socketRef],
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
    activeRunId: state.activeRunId,
    pendingInput: state.pendingInput,
    sessionWriterAgent: state.sessionWriterAgent,
    sessionDeviceId: state.sessionDeviceId,
    beginSession,
    finishSession,
    applySocketMessage,
    submitInput,
    dismissInput,
  };
}
