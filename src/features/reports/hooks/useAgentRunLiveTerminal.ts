"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  appendAgentRunTerminalOutput,
  loadAgentRunTerminalOutput,
  setAgentRunTerminalOutput,
} from "@/features/agent/utils/agentRunTerminalOutputStore";
import {
  sendAgentRunInputResponse,
  type AgentRunInputRequest,
} from "@/features/dispatch/utils/agentRunInputSocket";
import { handleAgentRunLiveTerminalSocketMessage } from "@/features/reports/utils/handleAgentRunLiveTerminalSocketMessage";
import { registerAgentRunLiveTerminal } from "@/features/reports/utils/registerAgentRunLiveTerminal";
import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/agent/utils/agentWitchSocketUtils";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export function useAgentRunLiveTerminal(
  runId: string,
  enabled: boolean,
): {
  readonly output: string;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly submitInput: (response: string) => void;
  readonly dismissInput: () => void;
} {
  const socketRef = useRef<WebSocket | null>(null);
  const [output, setOutput] = useState(() => loadAgentRunTerminalOutput(runId));
  const [pendingInput, setPendingInput] = useState<AgentRunInputRequest | null>(
    null,
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const unregister = registerAgentRunLiveTerminal(runId);
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
        handleAgentRunLiveTerminalSocketMessage(runId, parsed, {
          onOutputChunk: (chunk) => {
            const nextOutput = appendAgentRunTerminalOutput(runId, chunk);
            setOutput(nextOutput);
          },
          onStreamEnd: () => {
            socket.close();
          },
          onInputRequired: setPendingInput,
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
  }, [enabled, runId]);

  const submitInput = useCallback(
    (response: string) => {
      const trimmedResponse = response.trim();
      const socket = socketRef.current;

      if (
        pendingInput === null ||
        socket === null ||
        trimmedResponse.length === 0
      ) {
        return;
      }

      if (socket.readyState === WebSocket.OPEN) {
        sendAgentRunInputResponse(
          socket,
          pendingInput.agentRunId,
          trimmedResponse,
        );
      }

      setPendingInput(null);
      setOutput((current) => {
        const nextOutput = `${current}${trimmedResponse}\n`;
        setAgentRunTerminalOutput(runId, nextOutput);
        return nextOutput;
      });
    },
    [pendingInput, runId],
  );

  const dismissInput = useCallback(() => {
    setPendingInput(null);
  }, []);

  return {
    output,
    pendingInput,
    submitInput,
    dismissInput,
  };
}
