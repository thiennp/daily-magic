"use client";

import { createContext, useContext } from "react";

import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { AgentWitchDashboardMessageListener } from "@/features/agent-witch/dashboard/agentWitchDashboardBus";

export interface AgentWitchDashboardContextValue {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly subscribe: (
    listener: AgentWitchDashboardMessageListener,
  ) => () => void;
  readonly getSocket: () => WebSocket | null;
  readonly send: (raw: string) => void;
}

export const AgentWitchDashboardContext =
  createContext<AgentWitchDashboardContextValue | null>(null);

export const useAgentWitchDashboard = (): AgentWitchDashboardContextValue => {
  const context = useContext(AgentWitchDashboardContext);

  if (context === null) {
    throw new Error(
      "useAgentWitchDashboard must be used within AgentWitchDashboardProvider",
    );
  }

  return context;
};

export const useOptionalAgentWitchDashboard =
  (): AgentWitchDashboardContextValue | null =>
    useContext(AgentWitchDashboardContext);
