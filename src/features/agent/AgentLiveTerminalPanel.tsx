"use client";

import { useEffect, useRef } from "react";

import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import {
  buildAgentLiveTerminalDisplay,
  buildAgentLiveTerminalLoadingLine,
  shouldShowAgentLiveTerminalCursor,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/useAgentLiveTerminalLoadingDots";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

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
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly onSubmitFeedback: (message: string) => void;
}

export default function AgentLiveTerminalPanel({
  output,
  status,
  feedbackVisible,
  feedbackPendingQuestion,
  feedbackQueuedCount,
  feedbackQueueNotice,
  isFeedbackSubmitting,
  feedbackAutoFocus = false,
  onSubmitFeedback,
}: AgentLiveTerminalPanelProps) {
  const outputRef = useRef<HTMLPreElement>(null);
  const displayOutput = buildAgentLiveTerminalDisplay({ output, status });
  const showCursor = shouldShowAgentLiveTerminalCursor(status);
  const showLoadingIndicator =
    shouldShowAgentLiveTerminalLoadingIndicator(status);
  const loadingDotCount = useAgentLiveTerminalLoadingDots(showLoadingIndicator);

  useEffect(() => {
    const element = outputRef.current;
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, [displayOutput, loadingDotCount, showCursor, showLoadingIndicator]);

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
          {showLoadingIndicator ? (
            <>
              {"\n"}
              <span className="text-zinc-400">
                {buildAgentLiveTerminalLoadingLine(loadingDotCount)}
              </span>
            </>
          ) : null}
          {showCursor ? (
            <span className="animate-pulse text-emerald-400">▍</span>
          ) : null}
        </pre>
      </div>
      <AgentLiveTerminalFeedbackChat
        visible={feedbackVisible}
        pendingQuestion={feedbackPendingQuestion}
        queuedCount={feedbackQueuedCount}
        queueNotice={feedbackQueueNotice}
        isSubmitting={isFeedbackSubmitting}
        autoFocus={feedbackAutoFocus}
        onSubmit={onSubmitFeedback}
      />
    </section>
  );
}
