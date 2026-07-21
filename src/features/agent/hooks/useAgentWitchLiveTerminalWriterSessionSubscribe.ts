"use client";

import { useEffect, type RefObject } from "react";

import { sendDashboardTerminalSubscribe } from "@/features/agent/utils/sendDashboardTerminalSubscribe";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const useAgentWitchLiveTerminalWriterSessionSubscribe = (input: {
  readonly socketRef: RefObject<WebSocket | null>;
  readonly sessionWriterSessionId: string | null;
  readonly activeRunId?: string | null;
  readonly status: AgentLiveTerminalStatus;
}): void => {
  useEffect(() => {
    if (input.status !== "starting" && input.status !== "streaming") {
      return;
    }

    if (input.sessionWriterSessionId !== null) {
      sendDashboardTerminalSubscribe(input.socketRef.current, {
        writerSessionId: input.sessionWriterSessionId,
      });
      return;
    }

    if (
      input.activeRunId !== null &&
      input.activeRunId !== undefined &&
      input.activeRunId.length > 0
    ) {
      sendDashboardTerminalSubscribe(input.socketRef.current, {
        runId: input.activeRunId,
      });
    }
  }, [
    input.socketRef,
    input.sessionWriterSessionId,
    input.activeRunId,
    input.status,
  ]);
};
