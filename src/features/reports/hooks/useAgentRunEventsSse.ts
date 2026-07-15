"use client";

import { useEffect, useRef } from "react";

import type AgentRunSseEvent from "@/features/reports/types/AgentRunSseEvent.type";
import { parseAgentRunSseEvent } from "@/features/reports/utils/parseAgentRunSseEvent";

export function useAgentRunEventsSse(input: {
  readonly runId: string;
  readonly enabled: boolean;
  readonly onEvent: (event: AgentRunSseEvent) => void;
  readonly onTerminal?: () => void;
}): void {
  const onEventRef = useRef(input.onEvent);
  const onTerminalRef = useRef(input.onTerminal);

  useEffect(() => {
    onEventRef.current = input.onEvent;
  }, [input.onEvent]);

  useEffect(() => {
    onTerminalRef.current = input.onTerminal;
  }, [input.onTerminal]);

  useEffect(() => {
    if (!input.enabled || input.runId.length === 0) {
      return;
    }

    const source = new EventSource(
      `/api/agent-runs/${encodeURIComponent(input.runId)}/events`,
    );

    source.addEventListener("message", (event) => {
      const parsed = parseAgentRunSseEvent(String(event.data));
      if (parsed === null) {
        return;
      }

      onEventRef.current(parsed);

      if (
        parsed.kind === "terminal.end" ||
        parsed.kind === "status.completed" ||
        parsed.kind === "status.failed" ||
        parsed.kind === "status.denied" ||
        parsed.kind === "status.expired"
      ) {
        onTerminalRef.current?.();
        source.close();
      }
    });

    return () => {
      source.close();
    };
  }, [input.enabled, input.runId]);
}
