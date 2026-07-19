"use client";

import { useEffect, useRef } from "react";

import { parseAgentRunSseEvent } from "@/features/reports/utils/parseAgentRunSseEvent";
import {
  buildAgentRunEventsSseUrl,
  resolveNextAgentRunSseCursor,
} from "@/features/reports/utils/shouldRefreshAgentRunsOnSseEvent";

export function useAgentRunsActiveSse(input: {
  readonly enabled: boolean;
  readonly activeRunIdsKey: string;
  readonly onRunActivity: (runId: string) => void;
}): void {
  const onRunActivityRef = useRef(input.onRunActivity);
  const lastSeqByRunIdRef = useRef<Record<string, number>>({});

  useEffect(() => {
    onRunActivityRef.current = input.onRunActivity;
  }, [input.onRunActivity]);

  useEffect(() => {
    if (!input.enabled || input.activeRunIdsKey.length === 0) {
      return;
    }

    const activeRunIds = input.activeRunIdsKey.split(",").filter(Boolean);

    const sources = activeRunIds.map((runId) => {
      const afterSeq = lastSeqByRunIdRef.current[runId] ?? 0;
      const source = new EventSource(
        buildAgentRunEventsSseUrl(runId, afterSeq),
      );

      source.addEventListener("message", (event) => {
        const parsed = parseAgentRunSseEvent(String(event.data));
        if (parsed === null) {
          return;
        }

        const cursor = resolveNextAgentRunSseCursor({
          lastSeq: lastSeqByRunIdRef.current[runId] ?? 0,
          event: parsed,
        });
        lastSeqByRunIdRef.current[runId] = cursor.nextSeq;

        if (!cursor.shouldRefresh) {
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
  }, [input.activeRunIdsKey, input.enabled]);
}
