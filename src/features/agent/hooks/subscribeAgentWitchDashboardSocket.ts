import { createHttpDashboardSocketShim } from "@/features/agent/utils/createHttpDashboardSocketShim";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

/**
 * Subscribe to Agent Witch dashboard events over SSE (no WebSocket).
 * Outbound sends use an HTTP shim exposed via onSocketChange.
 */
export const subscribeAgentWitchDashboardSocket = (input: {
  readonly onStatusChange: (status: WsTestConnectionStatus) => void;
  readonly onMessage: (data: string) => void;
  readonly onSocketChange: (socket: WebSocket | null) => void;
}): (() => void) => {
  if (typeof window === "undefined" || typeof EventSource === "undefined") {
    input.onStatusChange("error");
    return () => undefined;
  }

  input.onStatusChange("connecting");

  const shim = createHttpDashboardSocketShim();
  input.onSocketChange(shim);

  const eventSource = new EventSource("/api/agent-witch/events");

  eventSource.onopen = () => {
    input.onStatusChange("connected");
    shim.send(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
        payload: { role: "dashboard" },
      }),
    );
  };

  eventSource.onmessage = (event) => {
    input.onMessage(String(event.data));
  };

  eventSource.onerror = () => {
    input.onStatusChange("disconnected");
  };

  return () => {
    eventSource.close();
    input.onSocketChange(null);
  };
};
