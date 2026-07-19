"use client";

import { forwardRef } from "react";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentLiveTerminalPanel from "@/features/agent/AgentLiveTerminalPanel";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalSectionProps extends AgentMacShellPanelProps {
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
>(function AgentLiveTerminalSection(props, ref) {
  const content = (
    <>
      {!props.isSteppedComposer && props.activeRunId !== null ? (
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
            href={`/reports/${props.activeRunId}`}
            className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Open full report
          </Link>
        </p>
      ) : null}
      <AgentLiveTerminalPanel {...props} activeRunId={props.activeRunId} />
      {props.errorMessage !== null ? (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
          {props.errorMessage}
        </p>
      ) : null}
    </>
  );

  return (
    <section ref={ref} tabIndex={-1} className="outline-none">
      {props.isSteppedComposer ? content : <AppPanel>{content}</AppPanel>}
    </section>
  );
});

export default AgentLiveTerminalSection;
