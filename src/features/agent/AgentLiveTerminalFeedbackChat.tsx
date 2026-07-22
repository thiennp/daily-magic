"use client";

import AgentLiveTerminalFeedbackActionButtons from "@/features/agent/AgentLiveTerminalFeedbackActionButtons";
import AgentLiveTerminalFeedbackMessageField from "@/features/agent/AgentLiveTerminalFeedbackMessageField";
import { useAgentLiveTerminalFeedbackDeferredSubmit } from "@/features/agent/hooks/useAgentLiveTerminalFeedbackDeferredSubmit";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

interface AgentLiveTerminalFeedbackChatProps {
  readonly visible: boolean;
  readonly pendingQuestion: string | null;
  readonly queuedCount: number;
  readonly queueNotice: string | null;
  readonly isSubmitting: boolean;
  readonly isWorking?: boolean;
  readonly autoFocus?: boolean;
  readonly isSteppedComposer?: boolean;
  readonly onSubmit: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly onFinishSession: () => void;
  readonly onStopRun?: () => void;
}

export default function AgentLiveTerminalFeedbackChat({
  visible,
  pendingQuestion,
  queuedCount,
  queueNotice,
  isSubmitting,
  isWorking = false,
  autoFocus = false,
  isSteppedComposer = false,
  onSubmit,
  onFinishSession,
  onStopRun,
}: AgentLiveTerminalFeedbackChatProps) {
  const deferredSubmit = useAgentLiveTerminalFeedbackDeferredSubmit({
    onSubmit,
  });
  if (!visible) return null;
  const isAnswerMode = pendingQuestion !== null;
  const isSimplifiedFollowUp = isSteppedComposer && !isAnswerMode;
  const content = (
    <>
      {isAnswerMode ? (
        <>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Your Mac agent needs input
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {pendingQuestion}
          </p>
        </>
      ) : isSimplifiedFollowUp ? null : (
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Follow up with your agent
        </p>
      )}
      <AgentLiveTerminalFeedbackMessageField
        isAnswerMode={isAnswerMode}
        isSteppedComposer={isSteppedComposer}
        message={deferredSubmit.message}
        hasMessageError={deferredSubmit.hasMessageError}
        messageError={deferredSubmit.messageError}
        autoFocus={autoFocus}
        onMessageChange={deferredSubmit.handleMessageChange}
      />
      {!isSimplifiedFollowUp && queuedCount > 0 ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {queuedCount} follow-up{queuedCount === 1 ? "" : "s"} queued while
          your Mac agent is working.
        </p>
      ) : null}
      {!isSimplifiedFollowUp && queueNotice !== null ? (
        <p className="mt-2 text-xs text-brand-600 dark:text-brand-400">
          {queueNotice}
        </p>
      ) : null}
      {isSimplifiedFollowUp && queuedCount > 0 ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {queuedCount} queued — will send when ready.
        </p>
      ) : null}
      <AgentLiveTerminalFeedbackActionButtons
        isAnswerMode={isAnswerMode}
        isWorking={isWorking && !isAnswerMode}
        isSubmitting={isSubmitting}
        showFinishSession={!isSimplifiedFollowUp}
        onFinishSession={onFinishSession}
        onStopRun={onStopRun}
        onSubmit={deferredSubmit.handleSubmit}
      />
    </>
  );
  return isSteppedComposer ? (
    <div className="mt-4">{content}</div>
  ) : (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
      {content}
    </div>
  );
}
