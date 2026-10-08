"use client";

import { useEffect, useRef } from "react";

import type { UseAgentWitchLiveTerminalResult } from "@/features/agent/types/UseAgentWitchLiveTerminalResult.type";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import {
  buildAgentRunRecordSocketMessage,
  isTerminalAgentRunRecordStatus,
  shouldResyncAgentLiveRunRecord,
} from "@/features/agent/utils/agentLiveRunRecordResync";
import { AGENT_LIVE_RUN_RECORD_RESYNC_MS } from "@/features/agent/utils/agentLiveProgressStall.constant";
import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";

const resyncAgentLiveRunRecordAsync = async (
  runId: string,
  applyTerminalMessage: (raw: string) => void,
): Promise<void> => {
  const outcome = await fetchAgentRunDetail(runId).catch(() => null);
  if (
    outcome === null ||
    outcome.status !== "ok" ||
    !isTerminalAgentRunRecordStatus(outcome.run.status)
  ) {
    return;
  }
  applyTerminalMessage(buildAgentRunRecordSocketMessage(outcome.run));
};

/**
 * S7: a floater that missed the hub's AGENT_RUN_RECORD (dashboard socket was
 * reconnecting, host crashed) re-reads its run on reconnect and while stalled,
 * so a server-failed run stops showing "In progress".
 */
export function useAgentLiveRunRecordResync(
  connectionStatus: WsTestConnectionStatus,
  terminal: Pick<
    UseAgentWitchLiveTerminalResult,
    "activeRunId" | "status" | "output" | "applySocketMessage"
  >,
): void {
  const {
    activeRunId,
    output,
    applySocketMessage: applyTerminalMessage,
  } = terminal;
  const isWorking = isAgentLiveTerminalWorking(terminal.status);
  const previousConnectionRef = useRef<WsTestConnectionStatus | null>(null);

  useEffect(() => {
    const previousConnectionStatus = previousConnectionRef.current;
    previousConnectionRef.current = connectionStatus;
    if (
      activeRunId !== null &&
      shouldResyncAgentLiveRunRecord({
        trigger: "reconnected",
        previousConnectionStatus,
        connectionStatus,
        activeRunId,
        isWorking,
      })
    ) {
      void resyncAgentLiveRunRecordAsync(activeRunId, applyTerminalMessage);
    }
  }, [connectionStatus, activeRunId, isWorking, applyTerminalMessage]);

  useEffect(() => {
    if (
      activeRunId === null ||
      !shouldResyncAgentLiveRunRecord({
        trigger: "stalled",
        previousConnectionStatus: null,
        connectionStatus,
        activeRunId,
        isWorking,
      })
    ) {
      return undefined;
    }
    // Re-armed on every output change, so it only fires after a quiet stretch.
    const timer = window.setInterval(() => {
      void resyncAgentLiveRunRecordAsync(activeRunId, applyTerminalMessage);
    }, AGENT_LIVE_RUN_RECORD_RESYNC_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [activeRunId, isWorking, output, connectionStatus, applyTerminalMessage]);
}
