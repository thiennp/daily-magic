"use client";

import { forwardRef } from "react";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentLiveTerminalPanel from "@/features/agent/AgentLiveTerminalPanel";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalSectionProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
  readonly activeRunId: string | null;
  readonly errorMessage: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly onSubmitFeedback: (message: string) => void;
  readonly onFinishSession: () => void;
  readonly isSteppedComposer?: boolean;
}

const AgentLiveTerminalSection = forwardRef<
  HTMLElement,
  AgentLiveTerminalSectionProps
>(function AgentLiveTerminalSection(
  {
    output,
    status,
    pendingCommandLine = null,
    activeRunId,
    errorMessage,
    feedbackVisible,
    feedbackPendingQuestion,
    feedbackPendingPartialOutput = null,
    feedbackQueuedCount,
    feedbackQueueNotice,
    isFeedbackSubmitting,
    feedbackAutoFocus = false,
    onSubmitFeedback,
    onFinishSession,
    isSteppedComposer = false,
  },
  ref,
) {
  const content = (
    <>
      {!isSteppedComposer && activeRunId !== null ? (
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
        pendingCommandLine={pendingCommandLine}
        feedbackVisible={feedbackVisible}
        feedbackPendingQuestion={feedbackPendingQuestion}
        feedbackPendingPartialOutput={feedbackPendingPartialOutput}
        feedbackQueuedCount={feedbackQueuedCount}
        feedbackQueueNotice={feedbackQueueNotice}
        isFeedbackSubmitting={isFeedbackSubmitting}
        feedbackAutoFocus={feedbackAutoFocus}
        isSteppedComposer={isSteppedComposer}
        onSubmitFeedback={onSubmitFeedback}
        onFinishSession={onFinishSession}
      />
      {errorMessage !== null ? (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
          {errorMessage}
        </p>
      ) : null}
    </>
  );

  return (
    <section ref={ref} tabIndex={-1} className="outline-none">
      {isSteppedComposer ? content : <AppPanel>{content}</AppPanel>}
    </section>
  );
});

export default AgentLiveTerminalSection;
