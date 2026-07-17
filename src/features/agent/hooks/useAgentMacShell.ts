"use client";

import { useCallback, useEffect, useState } from "react";

import {
  sendShellInput,
  sendShellResize,
  sendShellSessionClose,
  sendShellSessionOpen,
  sendShellSubscribe,
} from "@/features/agent/utils/sendAgentMacShellMessages";
import {
  initialAgentMacShellState,
  reduceAgentMacShellMessage,
  type AgentMacShellStatus,
} from "@/features/agent/utils/reduceAgentMacShellMessage";

export type { AgentMacShellStatus };

export const useAgentMacShell = (socketRef: {
  readonly current: WebSocket | null;
}) => {
  const [state, setState] = useState(initialAgentMacShellState);

  const openShell = useCallback(
    (deviceId?: string) => {
      setState((current) => ({
        ...current,
        status: "opening",
        errorMessage: null,
        clearToken: current.clearToken + 1,
        latestChunk: null,
      }));
      sendShellSessionOpen(socketRef.current, {
        ...(deviceId !== undefined ? { targetDeviceId: deviceId } : {}),
      });
    },
    [socketRef],
  );

  const closeShell = useCallback(() => {
    if (state.shellSessionId !== null) {
      sendShellSessionClose(socketRef.current, state.shellSessionId);
    }
    setState(initialAgentMacShellState());
  }, [socketRef, state.shellSessionId]);

  const sendInput = useCallback(
    (data: string) => {
      if (state.shellSessionId === null || !state.canWrite) {
        return;
      }
      sendShellInput(socketRef.current, state.shellSessionId, data);
    },
    [socketRef, state.canWrite, state.shellSessionId],
  );

  const sendResize = useCallback(
    (cols: number, rows: number) => {
      if (state.shellSessionId === null || !state.canWrite) {
        return;
      }
      sendShellResize(socketRef.current, state.shellSessionId, cols, rows);
    },
    [socketRef, state.canWrite, state.shellSessionId],
  );

  const attachShellSession = useCallback(
    (shellSessionId: string, canWrite: boolean) => {
      sendShellSubscribe(socketRef.current, shellSessionId);
      setState((current) => ({
        ...current,
        status: "open",
        shellSessionId,
        canWrite,
        errorMessage: null,
      }));
    },
    [socketRef],
  );

  const applySocketMessage = useCallback((raw: string) => {
    setState((current) => reduceAgentMacShellMessage(current, raw));
  }, []);

  useEffect(() => {
    if (
      state.status === "opening" &&
      state.shellSessionId !== null &&
      socketRef.current !== null
    ) {
      sendShellSubscribe(socketRef.current, state.shellSessionId);
    }
  }, [socketRef, state.shellSessionId, state.status]);

  return {
    status: state.status,
    shellSessionId: state.shellSessionId,
    canWrite: state.canWrite,
    latestChunk: state.latestChunk,
    chunkSeq: state.chunkSeq,
    clearToken: state.clearToken,
    errorMessage: state.errorMessage,
    openShell,
    closeShell,
    sendInput,
    sendResize,
    applySocketMessage,
    attachShellSession,
  };
};
