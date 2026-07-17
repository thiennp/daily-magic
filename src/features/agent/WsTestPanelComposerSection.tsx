"use client";

import WsTestPanelComposerActiveSession from "@/features/agent/WsTestPanelComposerActiveSession";
import WsTestPanelDelegationSection from "@/features/agent/WsTestPanelDelegationSection";
import type { WsTestPanelComposerSectionProps } from "@/features/agent/types/WsTestPanelComposerSectionProps.type";

export default function WsTestPanelComposerSection({
  isSessionActive,
  isSteppedComposer,
  terminalSectionRef,
  composer,
  sessionTargets,
  connectionStatus,
  promptHandlers,
  wizard,
  panelActions,
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
  onWriterAgentChange,
  onStartWriterAgent,
  onFinishSession,
  macShellStatus,
  macShellCanWrite,
  macShellLatestChunk,
  macShellChunkSeq,
  macShellClearToken,
  onMacShellInput,
  onMacShellResize,
  onMacShellClose,
}: WsTestPanelComposerSectionProps) {
  if (!isSessionActive) {
    return (
      <WsTestPanelDelegationSection
        composer={composer}
        sessionTargets={sessionTargets}
        connectionStatus={connectionStatus}
        writerAgent={sessionTargets.activeWriterAgent}
        onWriterAgentChange={onWriterAgentChange}
        promptHandlers={promptHandlers}
        isSteppedComposer={isSteppedComposer}
        wizard={wizard}
        panelActions={panelActions}
        stepTrail={stepTrail}
        onStartWriterAgent={onStartWriterAgent}
      />
    );
  }

  return (
    <WsTestPanelComposerActiveSession
      isSteppedComposer={isSteppedComposer}
      terminalSectionRef={terminalSectionRef}
      stepTrail={stepTrail}
      liveTerminalOutput={liveTerminalOutput}
      liveTerminalStatus={liveTerminalStatus}
      liveTerminalPendingCommandLine={liveTerminalPendingCommandLine}
      liveTerminalRunId={liveTerminalRunId}
      feedbackVisible={feedbackVisible}
      feedbackPendingQuestion={feedbackPendingQuestion}
      feedbackPendingPartialOutput={feedbackPendingPartialOutput}
      feedbackQueuedCount={feedbackQueuedCount}
      feedbackQueueNotice={feedbackQueueNotice}
      isFeedbackSubmitting={isFeedbackSubmitting}
      onSubmitFeedback={onSubmitFeedback}
      sessionErrorMessage={sessionErrorMessage}
      onFinishSession={onFinishSession}
      macShellStatus={macShellStatus}
      macShellCanWrite={macShellCanWrite}
      macShellLatestChunk={macShellLatestChunk}
      macShellChunkSeq={macShellChunkSeq}
      macShellClearToken={macShellClearToken}
      onMacShellInput={onMacShellInput}
      onMacShellResize={onMacShellResize}
      onMacShellClose={onMacShellClose}
    />
  );
}
