"use client";

import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { useAgentRunEventsSse } from "@/features/reports/hooks/useAgentRunEventsSse";

export function useAgentRunLiveTerminalSseOutput(input: {
  readonly runId: string;
  readonly enabled: boolean;
  readonly onOutput: (output: string) => void;
}): void {
  useAgentRunEventsSse({
    runId: input.runId,
    enabled: input.enabled,
    onEvent: (event) => {
      if (event.kind !== "terminal.end") {
        return;
      }

      const outputText =
        typeof event.payload.output === "string" ? event.payload.output : "";

      if (outputText.length === 0) {
        return;
      }

      setAgentRunTerminalOutput(input.runId, outputText);
      input.onOutput(outputText);
    },
  });
}
