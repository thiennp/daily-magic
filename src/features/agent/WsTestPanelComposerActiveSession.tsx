"use client";

import type { RefObject } from "react";

import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import WsTestPanelMacSessionSection from "@/features/agent/WsTestPanelMacSessionSection";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

export interface WsTestPanelComposerActiveSessionProps extends AgentMacShellPanelProps {
  readonly isSteppedComposer: boolean;
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalPendingCommandLine: string | null;
  readonly liveTerminalRunId: string | null;
  readonly sessionDeviceId?: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly onSubmitFeedback: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly sessionErrorMessage: string | null;
  readonly onFinishSession: () => void;
  readonly onStopRun: () => void;
  readonly onDeleteRun: () => void;
}

export default function WsTestPanelComposerActiveSession({
  isSteppedComposer,
  terminalSectionRef,
  stepTrail,
  liveTerminalOutput,
  liveTerminalStatus,
  liveTerminalPendingCommandLine,
  liveTerminalRunId,
  sessionDeviceId = null,
  feedbackVisible,
  feedbackPendingQuestion,
  feedbackPendingPartialOutput,
  feedbackQueuedCount,
  feedbackQueueNotice,
  isFeedbackSubmitting,
  onSubmitFeedback,
  sessionErrorMessage,
  onFinishSession,
  onStopRun,
  onDeleteRun,
  macShellStatus,
  macShellCanWrite,
  macShellLatestChunk,
  macShellChunkSeq,
  macShellClearToken,
  onMacShellInput,
  onMacShellResize,
  onMacShellClose,
}: WsTestPanelComposerActiveSessionProps) {
  return (
    <>
      {isSteppedComposer ? (
        <SendTaskComposerStepTrail items={stepTrail} />
      ) : null}
      <WsTestPanelMacSessionSection
        ref={terminalSectionRef}
        output={liveTerminalOutput}
        status={liveTerminalStatus}
        pendingCommandLine={liveTerminalPendingCommandLine}
        activeRunId={liveTerminalRunId}
        sessionDeviceId={sessionDeviceId}
        feedbackVisible={feedbackVisible}
        feedbackPendingQuestion={feedbackPendingQuestion}
        feedbackPendingPartialOutput={feedbackPendingPartialOutput}
        feedbackQueuedCount={feedbackQueuedCount}
        feedbackQueueNotice={feedbackQueueNotice}
        isFeedbackSubmitting={isFeedbackSubmitting}
        onSubmitFeedback={onSubmitFeedback}
        errorMessage={sessionErrorMessage}
        onFinishSession={onFinishSession}
        onStopRun={onStopRun}
        onDeleteRun={onDeleteRun}
        isSteppedComposer={isSteppedComposer}
        macShellStatus={macShellStatus}
        macShellCanWrite={macShellCanWrite}
        macShellLatestChunk={macShellLatestChunk}
        macShellChunkSeq={macShellChunkSeq}
        macShellClearToken={macShellClearToken}
        onMacShellInput={onMacShellInput}
        onMacShellResize={onMacShellResize}
        onMacShellClose={onMacShellClose}
      />
    </>
  );
}
