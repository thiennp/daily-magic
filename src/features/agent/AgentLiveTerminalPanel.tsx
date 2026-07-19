"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveProgressStallState } from "@/features/agent/hooks/useAgentLiveProgressStallState";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { renderAgentLiveTerminalBody } from "@/features/agent/utils/renderAgentLiveTerminalBody";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalPanelProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
  readonly feedbackVisible: boolean;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
  readonly feedbackQueuedCount: number;
  readonly feedbackQueueNotice: string | null;
  readonly isFeedbackSubmitting: boolean;
  readonly feedbackAutoFocus?: boolean;
  readonly isSteppedComposer?: boolean;
  readonly onSubmitFeedback: (message: string) => void;
  readonly onFinishSession: () => void;
}

export default function AgentLiveTerminalPanel(
  props: AgentLiveTerminalPanelProps,
) {
  const pendingCommandLine = props.pendingCommandLine ?? null;
  const isSteppedComposer = props.isSteppedComposer === true;
  const nextActions = parseLatestAgentLiveTerminalNextActions(props.output);
  const showNextActions =
    nextActions.length > 0 && props.feedbackPendingQuestion === null;
  const isWorking =
    props.status === "starting" ||
    props.status === "streaming" ||
    props.status === "waiting_approval";
  const stallState = useAgentLiveProgressStallState({
    isWorking,
    activityFingerprint: [
      props.output,
      props.feedbackPendingPartialOutput ?? "",
      props.status,
      pendingCommandLine ?? "",
    ].join("\u0000"),
  });
  const progress = buildAgentLiveProgressSteps({
    status: props.status,
    output: props.output,
    pendingCommandLine,
    pendingQuestion: props.feedbackPendingQuestion,
    partialOutput: props.feedbackPendingPartialOutput ?? null,
    stallState,
  });

  return (
    <section>
      {isSteppedComposer ? (
        <AgentLiveProgressFeed
          steps={progress.steps}
          replyPreview={progress.replyPreview}
          isWorking={isWorking}
          stallState={stallState}
          nextActions={showNextActions ? nextActions : []}
          nextActionsDisabled={props.isFeedbackSubmitting}
          onSelectNextAction={props.onSubmitFeedback}
        />
      ) : null}
      {renderAgentLiveTerminalBody({
        output: props.output,
        status: props.status,
        pendingCommandLine,
        isSteppedComposer,
        macShell: props,
      })}
      {!isSteppedComposer && showNextActions ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={props.isFeedbackSubmitting}
          onSelect={props.onSubmitFeedback}
        />
      ) : null}
      <AgentLiveTerminalFeedbackChat
        visible={props.feedbackVisible}
        pendingQuestion={props.feedbackPendingQuestion}
        queuedCount={props.feedbackQueuedCount}
        queueNotice={props.feedbackQueueNotice}
        isSubmitting={props.isFeedbackSubmitting}
        autoFocus={props.feedbackAutoFocus === true}
        isSteppedComposer={isSteppedComposer}
        onSubmit={props.onSubmitFeedback}
        onFinishSession={props.onFinishSession}
      />
    </section>
  );
}
