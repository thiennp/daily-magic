"use client";

import Button from "@/components/ui/button/Button";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

interface AgentLiveTerminalFeedbackActionButtonsProps {
  readonly isAnswerMode: boolean;
  readonly isWorking: boolean;
  readonly isSubmitting: boolean;
  readonly showFinishSession: boolean;
  readonly onFinishSession: () => void;
  readonly onStopRun?: () => void;
  readonly onSubmit: (
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
}

export default function AgentLiveTerminalFeedbackActionButtons({
  isAnswerMode,
  isWorking,
  isSubmitting,
  showFinishSession,
  onFinishSession,
  onStopRun,
  onSubmit,
}: AgentLiveTerminalFeedbackActionButtonsProps) {
  if (isAnswerMode) {
    return (
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        {showFinishSession ? (
          <Button size="sm" variant="outline" onClick={onFinishSession}>
            Finish session
          </Button>
        ) : null}
        <Button disabled={isSubmitting} onClick={() => onSubmit()}>
          Send answer
        </Button>
      </div>
    );
  }

  if (isWorking) {
    return (
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        {showFinishSession ? (
          <Button size="sm" variant="outline" onClick={onFinishSession}>
            Finish session
          </Button>
        ) : null}
        {onStopRun !== undefined ? (
          <Button size="sm" variant="outline" onClick={onStopRun}>
            Stop
          </Button>
        ) : null}
        <Button
          size="sm"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => onSubmit("queue")}
        >
          Queue
        </Button>
        <Button disabled={isSubmitting} onClick={() => onSubmit("steer")}>
          Steer message
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
      {showFinishSession ? (
        <Button size="sm" variant="outline" onClick={onFinishSession}>
          Finish session
        </Button>
      ) : null}
      <Button disabled={isSubmitting} onClick={() => onSubmit()}>
        Send message
      </Button>
    </div>
  );
}
