"use client";

import { useEffect } from "react";

import type { UseAgentWitchLiveTerminalResult } from "@/features/agent/types/UseAgentWitchLiveTerminalResult.type";
import {
  buildAgentRunRecordSocketMessage,
  isTerminalAgentRunRecordStatus,
} from "@/features/agent/utils/agentLiveRunRecordResync";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";

/** The host posts the run result a moment after the stream ends. */
const RECONCILE_DELAYS_MS = [2_000, 8_000] as const;

/**
 * 74408099 (Testi recheck @300): a run that failed fast ended its stream
 * before the server knew it failed, so the floater stayed on Success while
 * Tasks said Failed. Once the floater shows a finished run, it re-reads the
 * run record (the same one Tasks reads) and follows it.
 */
export function useAgentLiveFinishedRunReconcile(
  terminal: Pick<
    UseAgentWitchLiveTerminalResult,
    "activeRunId" | "status" | "applySocketMessage"
  >,
): void {
  const { activeRunId, status, applySocketMessage } = terminal;

  useEffect(() => {
    if (activeRunId === null || activeRunId.length === 0) {
      return undefined;
    }
    if (status !== "finished") {
      return undefined;
    }
    const timers = RECONCILE_DELAYS_MS.map((delayMs) =>
      window.setTimeout(() => {
        void fetchAgentRunDetail(activeRunId)
          .catch(() => null)
          .then((outcome) => {
            if (
              outcome !== null &&
              outcome.status === "ok" &&
              isTerminalAgentRunRecordStatus(outcome.run.status)
            ) {
              applySocketMessage(buildAgentRunRecordSocketMessage(outcome.run));
            }
          });
      }, delayMs),
    );
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [activeRunId, status, applySocketMessage]);
}
