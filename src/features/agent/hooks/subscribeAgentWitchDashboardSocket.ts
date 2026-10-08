import { createHttpDashboardSocketShim } from "@/features/agent/utils/createHttpDashboardSocketShim";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

/** 33512877: a stream that has not opened by now is retried, not waited on. */
export const DASHBOARD_STREAM_OPEN_TIMEOUT_MS = 12_000;
const DASHBOARD_STREAM_RETRY_MS = 2_000;

/**
 * Subscribe to AgentWitch dashboard events over SSE (no WebSocket).
 * Outbound sends use an HTTP shim exposed via onSocketChange.
 *
 * 33512877 (4fe3657c follow-up B): a fresh tab sat on "Reconnecting…" for
 * minutes while the host was live. Any event now counts as connected, a
 * stream that never opens is replaced, and a closed one is reopened.
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
  const state: {
    source: EventSource | null;
    timer: ReturnType<typeof setTimeout> | null;
    stopped: boolean;
  } = { source: null, timer: null, stopped: false };

  const clearTimer = (): void => {
    if (state.timer !== null) {
      clearTimeout(state.timer);
      state.timer = null;
    }
  };
  const markOpen = (): void => {
    clearTimer();
    input.onStatusChange("connected");
  };

  const open = (): void => {
    if (state.stopped) {
      return;
    }
    state.source?.close();
    const eventSource = new EventSource("/api/agent-witch/events");
    state.source = eventSource;
    clearTimer();
    state.timer = setTimeout(open, DASHBOARD_STREAM_OPEN_TIMEOUT_MS);

    eventSource.onopen = () => {
      markOpen();
      shim.send(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
          payload: { role: "dashboard" },
        }),
      );
    };

    eventSource.onmessage = (event) => {
      markOpen();
      input.onMessage(String(event.data));
    };

    eventSource.onerror = () => {
      input.onStatusChange("disconnected");
      clearTimer();
      state.timer = setTimeout(
        open,
        eventSource.readyState === EventSource.CLOSED
          ? DASHBOARD_STREAM_RETRY_MS
          : DASHBOARD_STREAM_OPEN_TIMEOUT_MS,
      );
    };
  };

  open();

  return () => {
    state.stopped = true;
    clearTimer();
    state.source?.close();
    input.onSocketChange(null);
  };
};
