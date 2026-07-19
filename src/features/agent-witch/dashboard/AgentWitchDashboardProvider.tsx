"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import {
  AgentWitchDashboardContext,
  type AgentWitchDashboardContextValue,
} from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import { createAgentWitchDashboardBus } from "@/features/agent-witch/dashboard/agentWitchDashboardBus";
import { handleAgentWitchDashboardInboundMessage } from "@/features/agent-witch/dashboard/handleAgentWitchDashboardInboundMessage";

export function AgentWitchDashboardProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const busRef = useRef(createAgentWitchDashboardBus());
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>("connecting");

  useEffect(() => {
    return subscribeAgentWitchDashboardSocket({
      onStatusChange: setConnectionStatus,
      onMessage: (raw) => {
        handleAgentWitchDashboardInboundMessage({
          raw,
          publish: busRef.current.publish,
        });
      },
      onSocketChange: (socket) => {
        socketRef.current = socket;
      },
    });
  }, []);

  const subscribe = useCallback(
    (listener: (raw: string) => void) => busRef.current.subscribe(listener),
    [],
  );

  const getSocket = useCallback(() => socketRef.current, []);

  const send = useCallback((raw: string) => {
    socketRef.current?.send(raw);
  }, []);

  const value = useMemo<AgentWitchDashboardContextValue>(
    () => ({
      connectionStatus,
      subscribe,
      getSocket,
      send,
    }),
    [connectionStatus, getSocket, send, subscribe],
  );

  return (
    <AgentWitchDashboardContext.Provider value={value}>
      {children}
    </AgentWitchDashboardContext.Provider>
  );
}
