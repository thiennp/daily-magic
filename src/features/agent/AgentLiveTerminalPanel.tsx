"use client";

import AgentLiveTerminalBashWindow from "@/features/agent/AgentLiveTerminalBashWindow";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import {
  buildAgentLiveTerminalDisplay,
  shouldShowAgentLiveTerminalCursor,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/useAgentLiveTerminalLoadingDots";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly isSteppedComposer?: boolean;
  readonly onSubmitFeedback: (message: string) => void;
  readonly onFinishSession: () => void;
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
  isSteppedComposer = false,
  onSubmitFeedback,
  onFinishSession,
}: AgentLiveTerminalPanelProps) {
  const displayOutput = buildAgentLiveTerminalDisplay({ output, status });
  const nextActions = parseLatestAgentLiveTerminalNextActions(output);
  const showNextActions =
    nextActions.length > 0 && feedbackPendingQuestion === null;
  const showCursor = shouldShowAgentLiveTerminalCursor(status);
  const showLoadingIndicator =
    shouldShowAgentLiveTerminalLoadingIndicator(status);
  const loadingDotCount = useAgentLiveTerminalLoadingDots(showLoadingIndicator);

  return (
    <section>
      {!isSteppedComposer ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
            Local Mac terminal
          </h2>
          <span className="rounded-full bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
            {AGENT_LIVE_TERMINAL_STATUS_LABEL[status]}
          </span>
        </div>
      ) : null}
      <AgentLiveTerminalBashWindow
        displayOutput={displayOutput}
        showLoadingIndicator={showLoadingIndicator}
        loadingDotCount={loadingDotCount}
        showCursor={showCursor}
      />
      {showNextActions ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={isFeedbackSubmitting}
          onSelect={onSubmitFeedback}
        />
      ) : null}
      <AgentLiveTerminalFeedbackChat
        visible={feedbackVisible}
        pendingQuestion={feedbackPendingQuestion}
        queuedCount={feedbackQueuedCount}
        queueNotice={feedbackQueueNotice}
        isSubmitting={isFeedbackSubmitting}
        autoFocus={feedbackAutoFocus}
        isSteppedComposer={isSteppedComposer}
        onSubmit={onSubmitFeedback}
        onFinishSession={onFinishSession}
      />
    </section>
  );
}
