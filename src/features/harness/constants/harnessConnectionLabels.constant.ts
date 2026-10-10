import type { WsTestConnectionStatus } from "@/features/agent/types/public-api/types";

export const HARNESS_CONNECTION_LABELS: Record<WsTestConnectionStatus, string> =
  {
    idle: "Idle",
    connecting: "Connecting…",
    connected: "Connected",
    disconnected: "Disconnected",
    error: "Connection error",
  };
