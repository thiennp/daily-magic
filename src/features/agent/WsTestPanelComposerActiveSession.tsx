"use client";

import type { RefObject } from "react";

import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import WsTestPanelMacSessionSection from "@/features/agent/WsTestPanelMacSessionSection";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export interface WsTestPanelComposerActiveSessionProps extends AgentMacShellPanelProps {
  readonly isSteppedComposer: boolean;
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
  readonly liveTerminalOutput: string;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
  readonly liveTerminalPendingCommandLine: string | null;
  readonly liveTerminalRunId: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly onSubmitFeedback: (message: string) => void;
  readonly sessionErrorMessage: string | null;
  readonly onFinishSession: () => void;
}

export default function WsTestPanelComposerActiveSession({
  isSteppedComposer,
  terminalSectionRef,
  stepTrail,
  liveTerminalOutput,
  liveTerminalStatus,
  liveTerminalPendingCommandLine,
  liveTerminalRunId,
  feedbackVisible,
  feedbackPendingQuestion,
  feedbackPendingPartialOutput,
  feedbackQueuedCount,
  feedbackQueueNotice,
  isFeedbackSubmitting,
  onSubmitFeedback,
  sessionErrorMessage,
  onFinishSession,
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
        feedbackVisible={feedbackVisible}
        feedbackPendingQuestion={feedbackPendingQuestion}
        feedbackPendingPartialOutput={feedbackPendingPartialOutput}
        feedbackQueuedCount={feedbackQueuedCount}
        feedbackQueueNotice={feedbackQueueNotice}
        isFeedbackSubmitting={isFeedbackSubmitting}
        onSubmitFeedback={onSubmitFeedback}
        errorMessage={sessionErrorMessage}
        onFinishSession={onFinishSession}
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
