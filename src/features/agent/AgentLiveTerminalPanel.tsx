"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import AgentLiveTerminalDeveloperMirror from "@/features/agent/AgentLiveTerminalDeveloperMirror";
import AgentLiveTerminalFeedbackChat from "@/features/agent/AgentLiveTerminalFeedbackChat";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { parseLatestAgentLiveTerminalNextActions } from "@/features/agent/utils/splitAgentLiveTerminalOutput";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalPanelProps {
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

export default function AgentLiveTerminalPanel({
  output,
  status,
  pendingCommandLine = null,
  feedbackVisible,
  feedbackPendingQuestion,
  feedbackPendingPartialOutput = null,
  feedbackQueuedCount,
  feedbackQueueNotice,
  isFeedbackSubmitting,
  feedbackAutoFocus = false,
  isSteppedComposer = false,
  onSubmitFeedback,
  onFinishSession,
}: AgentLiveTerminalPanelProps) {
  const nextActions = parseLatestAgentLiveTerminalNextActions(output);
  const showNextActions =
    nextActions.length > 0 && feedbackPendingQuestion === null;
  const progress = buildAgentLiveProgressSteps({
    status,
    output,
    pendingCommandLine,
    pendingQuestion: feedbackPendingQuestion,
    partialOutput: feedbackPendingPartialOutput,
  });
  const isWorking =
    status === "starting" ||
    status === "streaming" ||
    status === "waiting_approval";

  return (
    <section>
      {isSteppedComposer ? (
        <AgentLiveProgressFeed
          steps={progress.steps}
          replyPreview={progress.replyPreview}
          isWorking={isWorking}
          nextActions={showNextActions ? nextActions : []}
          nextActionsDisabled={isFeedbackSubmitting}
          onSelectNextAction={onSubmitFeedback}
        />
      ) : null}
      <div className={isSteppedComposer ? "mt-4" : undefined}>
        <AgentLiveTerminalDeveloperMirror
          output={output}
          status={status}
          pendingCommandLine={pendingCommandLine}
        />
      </div>
      {!isSteppedComposer && showNextActions ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={isFeedbackSubmitting}
          onSelect={onSubmitFeedback}
        />
      ) : null}
      <AgentLiveTerminalFeedbackChat
        visible={feedbackVisible}
        pendingQuestion={feedbackPendingQuestion}
        queuedCount={feedbackQueuedCount}
        queueNotice={feedbackQueueNotice}
        isSubmitting={isFeedbackSubmitting}
        autoFocus={feedbackAutoFocus}
        isSteppedComposer={isSteppedComposer}
        onSubmit={onSubmitFeedback}
        onFinishSession={onFinishSession}
      />
    </section>
  );
}
