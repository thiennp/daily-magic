"use client";

import { forwardRef } from "react";

import AgentLiveTerminalSection from "@/features/agent/AgentLiveTerminalSection";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPanelMacSessionSectionProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId: string | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceName: string | null;
  readonly errorMessage: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly onSubmitFeedback: (message: string) => void;
  readonly onFinishSession: () => void;
  readonly isSteppedComposer?: boolean;
}

const WsTestPanelMacSessionSection = forwardRef<
  HTMLElement,
  WsTestPanelMacSessionSectionProps
>(function WsTestPanelMacSessionSection(props, ref) {
  return (
    <AgentLiveTerminalSection
      ref={ref}
      output={props.output}
      status={props.status}
      activeRunId={props.activeRunId}
      sessionWriterAgent={props.sessionWriterAgent}
      sessionDeviceName={props.sessionDeviceName}
      feedbackVisible={props.feedbackVisible}
      feedbackPendingQuestion={props.feedbackPendingQuestion}
      feedbackQueuedCount={props.feedbackQueuedCount}
      feedbackQueueNotice={props.feedbackQueueNotice}
      isFeedbackSubmitting={props.isFeedbackSubmitting}
      feedbackAutoFocus
      onSubmitFeedback={props.onSubmitFeedback}
      errorMessage={props.errorMessage}
      onFinishSession={props.onFinishSession}
      isSteppedComposer={props.isSteppedComposer}
    />
  );
});

export default WsTestPanelMacSessionSection;
