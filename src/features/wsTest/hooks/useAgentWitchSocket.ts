"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

const WS_PATH = "/api/agent-witch/ws";

const buildWebSocketUrl = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}${WS_PATH}`;
};

const createRequestId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `req-${Date.now()}`;
};

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: string;
  readonly sendClaudePrompt: (prompt: string) => void;
}

export function useAgentWitchSocket(): UseAgentWitchSocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>("connecting");
  const [lastResponse, setLastResponse] = useState("");

  useEffect(() => {
    const wsUrl = buildWebSocketUrl();
    if (wsUrl.length === 0) {
      return;
    }

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionStatus("connected");
      socket.send(
        JSON.stringify({
          type: "agent.register",
          payload: { role: "dashboard" },
        }),
      );

      const savedToken = window.localStorage.getItem(
        AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY,
      );
      if (savedToken !== null && savedToken.trim().length > 0) {
        socket.send(
          JSON.stringify({
            type: "agent.pair",
            payload: { pairingToken: savedToken.trim() },
            requestId: createRequestId(),
          }),
        );
      }
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

  const sendClaudePrompt = useCallback((prompt: string) => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length === 0) {
      return;
    }

    const socket = socketRef.current;
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      setLastResponse(
        JSON.stringify({
          type: "system.error",
          payload: { errorMessage: "WebSocket is not connected." },
        }),
      );
      return;
    }

    socket.send(
      JSON.stringify({
        type: "command.claude.run",
        payload: { prompt: trimmedPrompt },
        requestId: createRequestId(),
      }),
    );
  }, []);

  return {
    connectionStatus,
    lastResponse,
    sendClaudePrompt,
  };
}
