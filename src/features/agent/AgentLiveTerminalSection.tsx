"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentLiveTerminalPanel from "@/features/agent/AgentLiveTerminalPanel";
import AgentLiveTerminalSessionBar from "@/features/agent/AgentLiveTerminalSessionBar";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface AgentLiveTerminalSectionProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId: string | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceName: string | null;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly errorMessage: string | null;
  readonly onSubmitInput: (response: string) => void;
  readonly onDismissInput: () => void;
  readonly onFinishSession: () => void;
}

export default function AgentLiveTerminalSection({
  output,
  status,
  activeRunId,
  sessionWriterAgent,
  sessionDeviceName,
  pendingInput,
  errorMessage,
  onSubmitInput,
  onDismissInput,
  onFinishSession,
}: AgentLiveTerminalSectionProps) {
  return (
    <AppPanel>
      {sessionWriterAgent !== null ? (
        <AgentLiveTerminalSessionBar
          sessionWriterAgent={sessionWriterAgent}
          sessionDeviceName={sessionDeviceName}
          onFinishSession={onFinishSession}
        />
      ) : null}
      {activeRunId !== null ? (
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          This job is saved locally in{" "}
          <Link
            href="/reports"
            className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Job history
          </Link>
          .{" "}
          <Link
            href={`/reports/${activeRunId}`}
            className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Open full report
          </Link>
        </p>
      ) : null}
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
