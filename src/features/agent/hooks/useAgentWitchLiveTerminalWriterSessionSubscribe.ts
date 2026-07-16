"use client";

import { useEffect, type RefObject } from "react";

import { sendDashboardTerminalSubscribe } from "@/features/agent/utils/sendDashboardTerminalSubscribe";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const useAgentWitchLiveTerminalWriterSessionSubscribe = (input: {
  readonly socketRef: RefObject<WebSocket | null>;
  readonly sessionWriterSessionId: string | null;
  readonly status: AgentLiveTerminalStatus;
}): void => {
  useEffect(() => {
    if (
      input.sessionWriterSessionId === null ||
      (input.status !== "starting" && input.status !== "streaming")
    ) {
      return;
    }

    sendDashboardTerminalSubscribe(input.socketRef.current, {
      writerSessionId: input.sessionWriterSessionId,
    });
  }, [input.socketRef, input.sessionWriterSessionId, input.status]);
};
