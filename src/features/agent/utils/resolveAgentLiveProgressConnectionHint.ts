import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export const resolveAgentLiveProgressConnectionHint = (input: {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly lastMacUpdateLabel: string | null;
}): string => {
  if (input.connectionStatus === "connected") {
    if (input.lastMacUpdateLabel === null) {
      return "Dashboard connected · waiting for the first alive signal…";
    }

    return `Dashboard connected · last seen alive ${input.lastMacUpdateLabel}`;
  }

  if (input.connectionStatus === "connecting") {
    return "Dashboard reconnecting — updates may be delayed until the connection returns.";
  }

  if (input.connectionStatus === "disconnected") {
    return "Dashboard disconnected — this page will not receive Mac updates until it reconnects.";
  }

  if (input.connectionStatus === "error") {
    return "Dashboard connection error — refresh the page or check your network.";
  }

  return "Dashboard idle — start a task to connect.";
};
