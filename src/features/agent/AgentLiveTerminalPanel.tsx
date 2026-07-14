"use client";

import { useEffect, useRef } from "react";

import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentLiveTerminalInputForm from "@/features/agent/AgentLiveTerminalInputForm";
import {
  buildAgentLiveTerminalDisplay,
  shouldShowAgentLiveTerminalCursor,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

const statusLabel: Record<AgentLiveTerminalStatus, string> = {
  idle: "Idle",
  starting: "Starting…",
  waiting_approval: "Waiting for approval",
  streaming: "Live",
  finished: "Finished",
};

interface AgentLiveTerminalPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly onSubmitInput: (response: string) => void;
  readonly onDismissInput: () => void;
}

export default function AgentLiveTerminalPanel({
  output,
  status,
  pendingInput,
  onSubmitInput,
  onDismissInput,
}: AgentLiveTerminalPanelProps) {
  const outputRef = useRef<HTMLPreElement>(null);
  const displayOutput = buildAgentLiveTerminalDisplay({ output, status });
  const showCursor = shouldShowAgentLiveTerminalCursor(status);

  useEffect(() => {
    const element = outputRef.current;
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, [displayOutput, showCursor]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Local Mac terminal
        </h2>
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
          {statusLabel[status]}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-zinc-400">
            agent-witch@mac — -zsh — 80×24
          </span>
        </div>
        <pre
          ref={outputRef}
          className={`${APP_SURFACE_BASH_TERMINAL_PRE_CLASS} max-h-96 min-h-48 whitespace-pre-wrap break-words border-0 rounded-none`}
        >
          {displayOutput}
          {showCursor ? (
            <span className="animate-pulse text-emerald-400">▍</span>
          ) : null}
        </pre>
      </div>
      {pendingInput !== null ? (
        <AgentLiveTerminalInputForm
          request={pendingInput}
          onSubmitInput={onSubmitInput}
          onDismissInput={onDismissInput}
        />
      ) : null}
    </section>
  );
}
