"use client";

import { useEffect, type RefObject } from "react";

import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";
import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export const useAgentWitchDashboardSocketConnection = (input: {
  readonly connectionLab: unknown;
  readonly applySocketMessage: (raw: string) => void;
  readonly setLastResponse: (display: AgentWitchSocketDisplay) => void;
  readonly setLiveConnectionStatus: (status: WsTestConnectionStatus) => void;
  readonly socketRef: RefObject<WebSocket | null>;
}): void => {
  const {
    connectionLab,
    applySocketMessage,
    setLastResponse,
    setLiveConnectionStatus,
    socketRef,
  } = input;

  useEffect(() => {
    if (connectionLab !== null) {
      return;
    }

    return subscribeAgentWitchDashboardSocket({
      onStatusChange: setLiveConnectionStatus,
      onMessage: (raw) => {
        trackOnboardingFromAgentWitchSocketMessage(raw);
        syncAgentRunLocalCacheFromSocket(raw);
        applySocketMessage(raw);
        setLastResponse(parseAgentWitchSocketDisplay(raw));
      },
      onSocketChange: (socket) => {
        socketRef.current = socket;
      },
    });
  }, [
    applySocketMessage,
    connectionLab,
    setLastResponse,
    setLiveConnectionStatus,
    socketRef,
  ]);
};
