import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

export const HARNESS_CONNECTION_LABELS: Record<WsTestConnectionStatus, string> =
  {
    idle: "Idle",
    connecting: "Connecting…",
    connected: "Connected",
    disconnected: "Disconnected",
    error: "Connection error",
  };
