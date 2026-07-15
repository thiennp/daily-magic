"use client";

import { useCallback, useState } from "react";

import {
  loadAgentRunTerminalOutput,
  setAgentRunTerminalOutput,
} from "@/features/agent/utils/agentRunTerminalOutputStore";
import {
  sendAgentRunInputResponse,
  type AgentRunInputRequest,
} from "@/features/dispatch/utils/agentRunInputSocket";
import { useAgentRunLiveTerminalSocket } from "@/features/reports/hooks/useAgentRunLiveTerminalSocket";
import { useAgentRunLiveTerminalSseOutput } from "@/features/reports/hooks/useAgentRunLiveTerminalSseOutput";

export function useAgentRunLiveTerminal(
  runId: string,
  enabled: boolean,
): {
  readonly output: string;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly submitInput: (response: string) => void;
  readonly dismissInput: () => void;
} {
  const [output, setOutput] = useState(() => loadAgentRunTerminalOutput(runId));
  const [pendingInput, setPendingInput] = useState<AgentRunInputRequest | null>(
    null,
  );

  const { socketRef } = useAgentRunLiveTerminalSocket({
    runId,
    enabled,
    onOutput: setOutput,
    onInputRequired: setPendingInput,
  });

  const submitInput = useCallback(
    (response: string) => {
      const trimmedResponse = response.trim();
      const socket = socketRef.current;

      if (
        pendingInput === null ||
        socket === null ||
        trimmedResponse.length === 0
      ) {
        return;
      }

      if (socket.readyState === WebSocket.OPEN) {
        sendAgentRunInputResponse(
          socket,
          pendingInput.agentRunId,
          trimmedResponse,
        );
      }

      setPendingInput(null);
      setOutput((current) => {
        const nextOutput = `${current}${trimmedResponse}\n`;
        setAgentRunTerminalOutput(runId, nextOutput);
        return nextOutput;
      });
    },
    [pendingInput, runId, socketRef],
  );

  const dismissInput = useCallback(() => {
    setPendingInput(null);
  }, []);

  useAgentRunLiveTerminalSseOutput({
    runId,
    enabled,
    onOutput: setOutput,
  });

  return {
    output,
    pendingInput,
    submitInput,
    dismissInput,
  };
}
