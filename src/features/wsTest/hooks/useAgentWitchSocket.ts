"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/wsTest/utils/agentWitchSocketUtils";
import { buildDemoClaudePromptAck } from "@/features/wsTest/utils/buildDemoClaudePromptAck";
import { sendClaudePromptOverSocket } from "@/features/wsTest/utils/sendClaudePromptOverSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: string;
  readonly sendClaudePrompt: (
    prompt: string,
    options?: {
      readonly writerAgent: HarnessWriterAgent;
      readonly targetUserId?: string;
      readonly groupId?: string;
      readonly capabilityId?: string;
    },
  ) => void;
}

export function useAgentWitchSocket(): UseAgentWitchSocketResult {
  const demoPreview = useDemoPreview();
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>(() =>
      demoPreview ? "connected" : "connecting",
    );
  const [lastResponse, setLastResponse] = useState("");

  useEffect(() => {
    if (demoPreview) {
      return;
    }

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
  }, [demoPreview]);

  const sendClaudePrompt = useCallback(
    (
      prompt: string,
      options?: {
        readonly writerAgent: HarnessWriterAgent;
        readonly targetUserId?: string;
        readonly groupId?: string;
        readonly capabilityId?: string;
      },
    ) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0 || options === undefined) {
        return;
      }

      if (demoPreview) {
        setLastResponse(buildDemoClaudePromptAck());
        return;
      }

      sendClaudePromptOverSocket({
        socket: socketRef.current,
        prompt: trimmedPrompt,
        writerAgent: options.writerAgent,
        targetUserId: options.targetUserId,
        groupId: options.groupId,
        capabilityId: options.capabilityId,
        onResponse: setLastResponse,
      });
    },
    [demoPreview],
  );

  return {
    connectionStatus,
    lastResponse,
    sendClaudePrompt,
  };
}
