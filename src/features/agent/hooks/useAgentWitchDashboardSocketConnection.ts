"use client";

import { useEffect, type RefObject } from "react";

import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import { shouldUpdateAgentWitchSocketDisplay } from "@/lib/agentWitch/shouldUpdateAgentWitchSocketDisplay";

export const useAgentWitchDashboardSocketConnection = (input: {
  readonly connectionLab: unknown;
  readonly applySocketMessage: (raw: string) => void;
  readonly setLastResponse: (display: AgentWitchSocketDisplay) => void;
  readonly setLiveConnectionStatus: (status: WsTestConnectionStatus) => void;
  readonly socketRef: RefObject<WebSocket | null>;
}): void => {
  const dashboard = useAgentWitchDashboard();
  const {
    connectionLab,
    applySocketMessage,
    setLastResponse,
    setLiveConnectionStatus,
    socketRef,
  } = input;
  const enabled = connectionLab === null;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setLiveConnectionStatus(dashboard.connectionStatus);
  }, [dashboard.connectionStatus, enabled, setLiveConnectionStatus]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    socketRef.current = dashboard.getSocket();
  }, [dashboard, enabled, socketRef]);

  useAgentWitchDashboardSubscription((raw) => {
    applySocketMessage(raw);
    if (shouldUpdateAgentWitchSocketDisplay(raw)) {
      setLastResponse(parseAgentWitchSocketDisplay(raw));
    }
  }, enabled);
};
