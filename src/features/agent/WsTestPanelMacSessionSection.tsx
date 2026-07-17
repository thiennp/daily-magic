"use client";

import { forwardRef } from "react";

import AgentLiveTerminalSection from "@/features/agent/AgentLiveTerminalSection";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface WsTestPanelMacSessionSectionProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine: string | null;
  readonly activeRunId: string | null;
  readonly errorMessage: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
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
      {...props}
      feedbackPendingPartialOutput={props.feedbackPendingPartialOutput ?? null}
      feedbackAutoFocus
    />
  );
});

export default WsTestPanelMacSessionSection;
