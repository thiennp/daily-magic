"use client";

import { useState } from "react";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalMirrorToggle from "@/features/agent/AgentLiveTerminalMirrorToggle";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveTerminalPanelProgress } from "@/features/agent/hooks/useAgentLiveTerminalPanelProgress";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { buildAgentLiveTerminalPanelMirror } from "@/features/agent/utils/buildAgentLiveTerminalPanelMirror";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

interface AgentLiveTerminalPanelProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId?: string | null;
  readonly sessionDeviceId?: string | null;
  readonly pendingCommandLine?: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly isSteppedComposer?: boolean;
  readonly onSubmitFeedback: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly onFinishSession: () => void;
  readonly onStopRun: () => void;
}

export default function AgentLiveTerminalPanel(
  props: AgentLiveTerminalPanelProps,
) {
  const pendingCommandLine = props.pendingCommandLine ?? null;
  const isSteppedComposer = props.isSteppedComposer === true;
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const nextActions = parseLatestAgentLiveTerminalNextActions(props.output);
  const showNextActions =
    nextActions.length > 0 && props.feedbackPendingQuestion === null;
  const panelProgress = useAgentLiveTerminalPanelProgress({
    output: props.output,
    status: props.status,
    activeRunId: props.activeRunId,
    pendingCommandLine,
    feedbackPendingQuestion: props.feedbackPendingQuestion,
    feedbackPendingPartialOutput: props.feedbackPendingPartialOutput,
  });
  const terminalBody = buildAgentLiveTerminalPanelMirror({
    show: !isSteppedComposer || isTerminalOpen,
    output: props.output,
    status: props.status,
    pendingCommandLine,
    feedbackPendingQuestion: props.feedbackPendingQuestion,
    isSteppedComposer,
    macShell: props,
  });

  return (
    <section>
      {isSteppedComposer ? (
        <AgentLiveProgressFeed
          steps={panelProgress.progress.steps}
          replyPreview={panelProgress.progress.replyPreview}
          isWorking={panelProgress.isWorking}
          stallState={panelProgress.stallState}
          connectionStatus={panelProgress.connectionStatus}
          msSinceLastActivity={panelProgress.msSinceLastActivity}
          estimateProgress={panelProgress.estimateProgress}
          wavePlanItems={panelProgress.wavePlanItems}
          sessionDeviceId={props.sessionDeviceId}
          nextActions={showNextActions ? nextActions : []}
          nextActionsDisabled={props.isFeedbackSubmitting}
          onSelectNextAction={props.onSubmitFeedback}
          onStopRun={props.onStopRun}
        />
      ) : null}
      {!isSteppedComposer && showNextActions ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={props.isFeedbackSubmitting}
          onSelect={props.onSubmitFeedback}
        />
      ) : null}
      {!isSteppedComposer ? terminalBody : null}
      <AgentLiveTerminalFeedbackChat
        visible={props.feedbackVisible}
        pendingQuestion={props.feedbackPendingQuestion}
        queuedCount={props.feedbackQueuedCount}
        queueNotice={props.feedbackQueueNotice}
        isSubmitting={props.isFeedbackSubmitting}
        isWorking={panelProgress.isWorking}
        autoFocus={props.feedbackAutoFocus === true}
        isSteppedComposer={isSteppedComposer}
        onSubmit={props.onSubmitFeedback}
        onFinishSession={props.onFinishSession}
        onStopRun={props.onStopRun}
      />
      {isSteppedComposer ? (
        <>
          <AgentLiveTerminalMirrorToggle
            isOpen={isTerminalOpen}
            onToggle={() => setIsTerminalOpen((open) => !open)}
          />
          {terminalBody}
        </>
      ) : null}
    </section>
  );
}
