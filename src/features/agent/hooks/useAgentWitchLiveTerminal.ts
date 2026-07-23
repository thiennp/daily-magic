"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAgentLiveTerminalDeleteRun } from "@/features/agent/hooks/useAgentLiveTerminalDeleteRun";
import { useAgentLiveTerminalStopRun } from "@/features/agent/hooks/useAgentLiveTerminalStopRun";
import { useAgentWitchLiveTerminalWriterSessionSubscribe } from "@/features/agent/hooks/useAgentWitchLiveTerminalWriterSessionSubscribe";
import { useShouldRestoreAgentLiveTerminalSession } from "@/features/agent/hooks/useShouldRestoreAgentLiveTerminalSession";
import type { UseAgentWitchLiveTerminalResult } from "@/features/agent/types/UseAgentWitchLiveTerminalResult.type";
import { finishAgentLiveTerminalWriterSession } from "@/features/agent/utils/sendWriterSessionEnd";
import {
  finishAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
  type AgentLiveTerminalState,
} from "@/features/agent/utils/reduceAgentLiveTerminalMessage";
import {
  persistAgentLiveTerminalStateIfAllowed,
  resolveInitialAgentLiveTerminalState,
} from "@/features/agent/utils/resolveInitialAgentLiveTerminalState";
import { resolveNextAgentLiveTerminalBeginState } from "@/features/agent/utils/resolveNextAgentLiveTerminalBeginState";
import { submitAgentLiveTerminalInput } from "@/features/agent/utils/submitAgentLiveTerminalInput";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export function useAgentWitchLiveTerminal(socketRef: {
  readonly current: WebSocket | null;
}): UseAgentWitchLiveTerminalResult {
  const shouldRestore = useShouldRestoreAgentLiveTerminalSession();
  const allowPersistRef = useRef(shouldRestore.shouldRestore);
  const [state, setState] = useState<AgentLiveTerminalState>(() =>
    resolveInitialAgentLiveTerminalState({
      shouldRestore: shouldRestore.shouldRestore,
      sourceRunId: shouldRestore.sourceRunId,
    }),
  );

  useEffect(() => {
    if (
      persistAgentLiveTerminalStateIfAllowed({
        allowPersist: allowPersistRef.current,
        state,
      })
    ) {
      allowPersistRef.current = true;
    }
  }, [state]);

  useAgentWitchLiveTerminalWriterSessionSubscribe({
    socketRef,
    sessionWriterSessionId: state.sessionWriterSessionId,
    activeRunId: state.activeRunId,
    status: state.status,
  });

  const beginSession = useCallback(
    (
      commandLine: string,
      writerAgent: HarnessWriterAgent,
      deviceId?: string,
    ) => {
      allowPersistRef.current = true;
      setState((current) =>
        resolveNextAgentLiveTerminalBeginState(
          current,
          commandLine,
          writerAgent,
          deviceId,
        ),
      );
    },
    [],
  );

  const finishSession = useCallback(() => {
    allowPersistRef.current = true;
    setState((current) => {
      finishAgentLiveTerminalWriterSession(socketRef.current, current);
      return finishAgentLiveTerminalSession();
    });
  }, [socketRef]);

  const applySocketMessage = useCallback((raw: string) => {
    try {
      setState((current) =>
        reduceAgentLiveTerminalMessage(current, JSON.parse(raw) as unknown),
      );
    } catch {
      return;
    }
  }, []);

  const submitInput = useCallback(
    (response: string) => {
      setState(
        (current) =>
          submitAgentLiveTerminalInput(socketRef.current, current, response) ??
          current,
      );
    },
    [socketRef],
  );

  const dismissInput = useCallback(() => {
    setState((current) => ({ ...current, pendingInput: null }));
  }, []);

  const { stopRun } = useAgentLiveTerminalStopRun(socketRef, state);
  const { deleteRun } = useAgentLiveTerminalDeleteRun(
    socketRef,
    state,
    setState,
  );

  return {
    output: state.output,
    status: state.status,
    activeRunId: state.activeRunId,
    pendingInput: state.pendingInput,
    pendingCommandLine: state.pendingCommandLine,
    sessionWriterAgent: state.sessionWriterAgent,
    sessionDeviceId: state.sessionDeviceId,
    beginSession,
    finishSession,
    stopRun,
    deleteRun,
    applySocketMessage,
    submitInput,
    dismissInput,
  };
}
