"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentLiveTerminalPanel from "@/features/agent/AgentLiveTerminalPanel";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

interface AgentLiveTerminalSectionProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly errorMessage: string | null;
  readonly onSubmitInput: (response: string) => void;
  readonly onDismissInput: () => void;
}

export default function AgentLiveTerminalSection({
  output,
  status,
  pendingInput,
  errorMessage,
  onSubmitInput,
  onDismissInput,
}: AgentLiveTerminalSectionProps) {
  return (
    <AppPanel>
      <AgentLiveTerminalPanel
        output={output}
        status={status}
        pendingInput={pendingInput}
        onSubmitInput={onSubmitInput}
        onDismissInput={onDismissInput}
      />
      {errorMessage !== null ? (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
          {errorMessage}
        </p>
      ) : null}
    </AppPanel>
  );
}
