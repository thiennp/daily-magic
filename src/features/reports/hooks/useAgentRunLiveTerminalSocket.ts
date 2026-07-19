"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import { appendAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { sendDashboardTerminalSubscribe } from "@/features/agent/utils/sendDashboardTerminalSubscribe";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { handleAgentRunLiveTerminalSocketMessage } from "@/features/reports/utils/handleAgentRunLiveTerminalSocketMessage";
import { registerAgentRunLiveTerminal } from "@/features/reports/utils/registerAgentRunLiveTerminal";

export function useAgentRunLiveTerminalSocket(input: {
  readonly runId: string;
  readonly enabled: boolean;
  readonly onOutput: (output: string) => void;
  readonly onInputRequired: (request: AgentRunInputRequest) => void;
}): { readonly socketRef: RefObject<WebSocket | null> } {
  const dashboard = useAgentWitchDashboard();
  const socketRef = useRef<WebSocket | null>(null);
  const onOutputRef = useRef(input.onOutput);
  const onInputRequiredRef = useRef(input.onInputRequired);
  const unregisterRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onOutputRef.current = input.onOutput;
  }, [input.onOutput]);

  useEffect(() => {
    onInputRequiredRef.current = input.onInputRequired;
  }, [input.onInputRequired]);

  useEffect(() => {
    if (!input.enabled) {
      return;
    }

    const unregister = registerAgentRunLiveTerminal(input.runId);
    unregisterRef.current = unregister;
    socketRef.current = dashboard.getSocket();
    sendDashboardTerminalSubscribe(dashboard.getSocket(), {
      runId: input.runId,
    });

    return () => {
      unregister();
      unregisterRef.current = null;
      socketRef.current = null;
    };
  }, [dashboard, input.enabled, input.runId]);

  const handleMessage = useCallback(
    (raw: string) => {
      try {
        const parsed: unknown = JSON.parse(raw);
        handleAgentRunLiveTerminalSocketMessage(input.runId, parsed, {
          onOutputChunk: (chunk) => {
            const nextOutput = appendAgentRunTerminalOutput(input.runId, chunk);
            onOutputRef.current(nextOutput);
          },
          onStreamEnd: () => {
            unregisterRef.current?.();
            unregisterRef.current = null;
          },
          onInputRequired: (request) => {
            onInputRequiredRef.current(request);
          },
        });
      } catch {
        return;
      }
    },
    [input.runId],
  );

  useAgentWitchDashboardSubscription(handleMessage, input.enabled);

  return { socketRef };
}
