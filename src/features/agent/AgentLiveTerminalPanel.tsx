"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveProgressStallState } from "@/features/agent/hooks/useAgentLiveProgressStallState";
import { useAgentRunHeartbeatStallReset } from "@/features/agent/hooks/useAgentRunHeartbeatStallReset";
import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { renderAgentLiveTerminalBody } from "@/features/agent/utils/renderAgentLiveTerminalBody";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

interface AgentLiveTerminalPanelProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId?: string | null;
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
  const dashboard = useAgentWitchDashboard();
  const connectionStatus = dashboard?.connectionStatus ?? "disconnected";
  const { stallState, msSinceLastActivity, noteRunHeartbeat } =
    useAgentLiveProgressStallState({
      isWorking,
      activityFingerprint: [
        props.output,
        props.feedbackPendingPartialOutput ?? "",
        props.status,
        pendingCommandLine ?? "",
      ].join("\u0000"),
    });
  const activeRunId = props.activeRunId ?? null;

  useAgentRunHeartbeatStallReset({
    activeRunId,
    isWorking,
    noteRunHeartbeat,
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
          connectionStatus={connectionStatus}
          msSinceLastActivity={msSinceLastActivity}
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
