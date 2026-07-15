"use client";

import { useEffect, useRef } from "react";

import { parseAgentRunSseEvent } from "@/features/reports/utils/parseAgentRunSseEvent";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const ACTIVE_STATUSES = new Set<string>([
  AgentRunStatus.RUNNING,
  AgentRunStatus.PENDING_APPROVAL,
]);

export function useAgentRunsActiveSse(input: {
  readonly enabled: boolean;
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly onRunActivity: (runId: string) => void;
}): void {
  const onRunActivityRef = useRef(input.onRunActivity);

  useEffect(() => {
    onRunActivityRef.current = input.onRunActivity;
  }, [input.onRunActivity]);

  useEffect(() => {
    if (!input.enabled) {
      return;
    }

    const activeRunIds = input.runs
      .filter((run) => ACTIVE_STATUSES.has(run.status))
      .map((run) => run.id);

    if (activeRunIds.length === 0) {
      return;
    }

    const sources = activeRunIds.map((runId) => {
      const source = new EventSource(
        `/api/agent-runs/${encodeURIComponent(runId)}/events`,
      );

      source.addEventListener("message", (event) => {
        const parsed = parseAgentRunSseEvent(String(event.data));
        if (parsed === null) {
          return;
        }

        onRunActivityRef.current(runId);

        if (
          parsed.kind === "terminal.end" ||
          parsed.kind.startsWith("status.")
        ) {
          source.close();
        }
      });

      return source;
    });

    return () => {
      for (const source of sources) {
        source.close();
      }
    };
  }, [input.enabled, input.runs]);
}
