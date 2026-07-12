"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  buildAgentWitchWebSocketUrl,
  createAgentWitchRequestId,
  sendAgentWitchPairingToken,
} from "@/features/wsTest/utils/agentWitchSocketUtils";
import { requestAgentWitchWake } from "@/lib/agentWitch/requestAgentWitchWake";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: string;
  readonly sendClaudePrompt: (
    prompt: string,
    options?: {
      readonly targetUserId?: string;
      readonly groupId?: string;
    },
  ) => void;
}

export function useAgentWitchSocket(): UseAgentWitchSocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>("connecting");
  const [lastResponse, setLastResponse] = useState("");

  useEffect(() => {
    const wsUrl = buildAgentWitchWebSocketUrl();
    if (wsUrl.length === 0) {
      return;
    }

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionStatus("connected");
      socket.send(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
          payload: { role: "dashboard" },
        }),
      );
      sendAgentWitchPairingToken(socket);
    });

    socket.addEventListener("message", (event) => {
      setLastResponse(String(event.data));
    });

    socket.addEventListener("close", () => {
      setConnectionStatus("disconnected");
    });

    socket.addEventListener("error", () => {
      setConnectionStatus("error");
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  const sendClaudePrompt = useCallback(
    (
      prompt: string,
      options?: {
        readonly targetUserId?: string;
        readonly groupId?: string;
      },
    ) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0) {
        return;
      }

      const sendPrompt = (): void => {
        const socket = socketRef.current;
        if (socket === null || socket.readyState !== WebSocket.OPEN) {
          setLastResponse(
            JSON.stringify({
              type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
              payload: { errorMessage: "WebSocket is not connected." },
            }),
          );
          return;
        }

        socket.send(
          JSON.stringify({
            type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
            payload: {
              prompt: trimmedPrompt,
              ...(options?.targetUserId
                ? { targetUserId: options.targetUserId }
                : {}),
              ...(options?.groupId ? { groupId: options.groupId } : {}),
            },
            requestId: createAgentWitchRequestId(),
          }),
        );
      };

      void requestAgentWitchWake().finally(sendPrompt);
    },
    [],
  );

  return {
    connectionStatus,
    lastResponse,
    sendClaudePrompt,
  };
}
