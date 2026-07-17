"use client";

import type { RefObject } from "react";

import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import type { useWsTestComposerPanelActions } from "@/features/agent/hooks/useWsTestComposerPanelActions";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import WsTestPanelDelegationSection from "@/features/agent/WsTestPanelDelegationSection";
import WsTestPanelMacSessionSection from "@/features/agent/WsTestPanelMacSessionSection";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPanelComposerSectionProps {
  readonly isSessionActive: boolean;
  readonly isSteppedComposer: boolean;
  readonly terminalSectionRef: RefObject<HTMLElement | null>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly sessionTargets: ReturnType<typeof resolveAgentSessionTargets>;
  readonly connectionStatus: ReturnType<
    typeof useAgentWitchSocket
  >["connectionStatus"];
  readonly promptHandlers: ReturnType<typeof useWsTestPromptHandlers>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly panelActions: ReturnType<typeof useWsTestComposerPanelActions>;
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
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  readonly onFinishSession: () => void;
}

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
}: WsTestPanelComposerSectionProps) {
  if (isSessionActive) {
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
        />
      </>
    );
  }

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
