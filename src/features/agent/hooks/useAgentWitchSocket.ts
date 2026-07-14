"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import { buildDemoClaudePromptAck } from "@/features/agent/utils/buildDemoClaudePromptAck";
import { resolveInitialConnectionStatus } from "@/features/agent/utils/connectAgentWitchDashboardSocket";
import { sendClaudePromptOverSocket } from "@/features/agent/utils/sendClaudePromptOverSocket";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

import type { WsTestConnectionStatus } from "../types/WsTestConnectionStatus.type";

export interface UseAgentWitchSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastResponse: AgentWitchSocketDisplay;
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
  const demoPreview = useDemoPreview();
  const connectionLab = useConnectionLab();
  const socketRef = useRef<WebSocket | null>(null);
  const [liveConnectionStatus, setLiveConnectionStatus] =
    useState<WsTestConnectionStatus>(() =>
      resolveInitialConnectionStatus(
        demoPreview !== null || connectionLab !== null,
        demoPreview ? "connected" : connectionLab?.connectionStatus,
      ),
    );
  const [lastResponse, setLastResponse] = useState<AgentWitchSocketDisplay>({
    text: "",
    isError: false,
  });
  const connectionStatus =
    connectionLab?.connectionStatus ??
    (demoPreview ? "connected" : liveConnectionStatus);

  useEffect(() => {
    if (connectionLab !== null || demoPreview) {
      return;
    }

    return subscribeAgentWitchDashboardSocket({
      onStatusChange: setLiveConnectionStatus,
      onMessage: (raw) => {
        setLastResponse(parseAgentWitchSocketDisplay(raw));
      },
      onSocketChange: (socket) => {
        socketRef.current = socket;
      },
    });
  }, [connectionLab, demoPreview]);

  const sendClaudePrompt = useCallback(
    (
      prompt: string,
      options?: {
        readonly writerAgent: HarnessWriterAgent;
        readonly targetUserId?: string;
        readonly groupId?: string;
        readonly capabilityId?: string;
        readonly targetDeviceId?: string;
      },
    ) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0 || options === undefined) {
        return;
      }

      if (demoPreview !== null || connectionLab !== null) {
        setLastResponse(
          parseAgentWitchSocketDisplay(buildDemoClaudePromptAck()),
        );
        return;
      }

      sendClaudePromptOverSocket({
        socket: socketRef.current,
        prompt: trimmedPrompt,
        writerAgent: options.writerAgent,
        targetUserId: options.targetUserId,
        groupId: options.groupId,
        capabilityId: options.capabilityId,
        targetDeviceId: options.targetDeviceId,
        onResponse: (raw) => {
          setLastResponse(parseAgentWitchSocketDisplay(raw));
        },
      });
    },
    [connectionLab, demoPreview],
  );

  return {
    connectionStatus,
    lastResponse,
    sendClaudePrompt,
  };
}
