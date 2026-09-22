"use client";

import AgentLiveTerminalPanelProgressFeed from "@/features/agent/AgentLiveTerminalPanelProgressFeed";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalPanelSteppedOutput from "@/features/agent/AgentLiveTerminalPanelSteppedOutput";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveTerminalPanelProgress } from "@/features/agent/hooks/useAgentLiveTerminalPanelProgress";
import type AgentLiveTerminalPanelProps from "@/features/agent/types/AgentLiveTerminalPanelProps.type";
import { buildAgentLiveTerminalPanelMirror } from "@/features/agent/utils/buildAgentLiveTerminalPanelMirror";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

export default function AgentLiveTerminalPanel(
  props: AgentLiveTerminalPanelProps,
) {
  const pendingCommandLine = props.pendingCommandLine ?? null;
  const isSteppedComposer = props.isSteppedComposer === true;
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
    show: !isSteppedComposer,
    output: props.output,
    status: props.status,
    pendingCommandLine,
    feedbackPendingQuestion: props.feedbackPendingQuestion,
    isSteppedComposer,
    macShell: props,
  });
  const onDeleteRun =
    props.activeRunId !== null && props.activeRunId !== undefined
      ? props.onDeleteRun
      : undefined;

  return (
    <section>
      {isSteppedComposer ? (
        <AgentLiveTerminalPanelProgressFeed
          panelProgress={panelProgress}
          sessionDeviceId={props.sessionDeviceId}
          nextActions={showNextActions ? nextActions : []}
          nextActionsDisabled={props.isFeedbackSubmitting}
          onSelectNextAction={props.onSubmitFeedback}
          onStopRun={props.onStopRun}
          onDeleteRun={onDeleteRun}
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
        isWorking={panelProgress.isWorking && !panelProgress.isStopping}
        autoFocus={props.feedbackAutoFocus === true}
        isSteppedComposer={isSteppedComposer}
        onSubmit={props.onSubmitFeedback}
        onFinishSession={props.onFinishSession}
        onStopRun={props.onStopRun}
      />
      {isSteppedComposer ? (
        <AgentLiveTerminalPanelSteppedOutput
          pendingCommandLine={pendingCommandLine}
          runOutcome={panelProgress.progress.outcome}
          humanSummary={panelProgress.progress.humanSummary}
          {...props}
        />
      ) : null}
    </section>
  );
}
