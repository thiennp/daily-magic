"use client";

import { useEffect, useRef, type RefObject } from "react";

import { appendAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { handleAgentRunLiveTerminalSocketMessage } from "@/features/reports/utils/handleAgentRunLiveTerminalSocketMessage";
import { registerAgentRunLiveTerminal } from "@/features/reports/utils/registerAgentRunLiveTerminal";
import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/agent/utils/agentWitchSocketUtils";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export function useAgentRunLiveTerminalSocket(input: {
  readonly runId: string;
  readonly enabled: boolean;
  readonly onOutput: (output: string) => void;
  readonly onInputRequired: (request: AgentRunInputRequest) => void;
}): { readonly socketRef: RefObject<WebSocket | null> } {
  const socketRef = useRef<WebSocket | null>(null);
  const onOutputRef = useRef(input.onOutput);
  const onInputRequiredRef = useRef(input.onInputRequired);

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
    const wsUrl = buildAgentWitchWebSocketUrl();

    if (wsUrl.length === 0) {
      unregister();
      return;
    }

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
          payload: { role: "dashboard" },
        }),
      );
      sendAgentWitchPairingToken(socket);
    });

    socket.addEventListener("message", (event) => {
      try {
        const parsed: unknown = JSON.parse(String(event.data));
        handleAgentRunLiveTerminalSocketMessage(input.runId, parsed, {
          onOutputChunk: (chunk) => {
            const nextOutput = appendAgentRunTerminalOutput(input.runId, chunk);
            onOutputRef.current(nextOutput);
          },
          onStreamEnd: () => {
            socket.close();
          },
          onInputRequired: (request) => {
            onInputRequiredRef.current(request);
          },
        });
      } catch {
        return;
      }
    });

    return () => {
      socket.close();
      socketRef.current = null;
      unregister();
    };
  }, [input.enabled, input.runId]);

  return { socketRef };
}
