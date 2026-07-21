"use client";

import { useCallback, useState } from "react";

import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useAgentLiveTerminalFeedbackQueue } from "@/features/agent/hooks/useAgentLiveTerminalFeedbackQueue";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { applyAgentLiveTerminalFeedbackAction } from "@/features/agent/utils/applyAgentLiveTerminalFeedbackAction";
import { buildWsTestSendOptions } from "@/features/agent/utils/buildWsTestSendOptions";
import {
  resolveAgentLiveTerminalFeedbackAction,
  type AgentLiveTerminalFeedbackPreferredMode,
} from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useAgentLiveTerminalFeedback = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
  readonly activeDeviceId: string;
  readonly activeWriterAgent: HarnessWriterAgent;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly sendClaudePrompt: ReturnType<
    typeof useAgentWitchSocket
  >["sendClaudePrompt"];
  readonly submitInput: (response: string) => void;
  readonly enqueueRun: ReturnType<typeof useAgentRunQueue>["enqueueRun"];
}): {
  readonly visible: boolean;
  readonly pendingQuestion: string | null;
  readonly pendingPartialOutput: string | null;
  readonly queuedCount: number;
  readonly queueNotice: string | null;
  readonly isSubmitting: boolean;
  readonly submitFeedback: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
} => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasOpenSession = input.sessionWriterAgent !== null;
  const { activeDeviceId, activeWriterAgent, composer, sendClaudePrompt } =
    input;

  const sendFollowUp = useCallback(
    (message: string) => {
      sendClaudePrompt(
        message,
        buildWsTestSendOptions(composer, activeWriterAgent, activeDeviceId),
      );
    },
    [activeDeviceId, activeWriterAgent, composer, sendClaudePrompt],
  );

  const feedbackQueue = useAgentLiveTerminalFeedbackQueue({
    status: input.status,
    pendingInput: input.pendingInput,
    sendFollowUp,
  });

  const submitFeedback = useCallback(
    (
      message: string,
      preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
    ) => {
      applyAgentLiveTerminalFeedbackAction({
        action: resolveAgentLiveTerminalFeedbackAction({
          message,
          status: input.status,
          connectionStatus: input.connectionStatus,
          hasPendingInput: input.pendingInput !== null,
          hasOpenSession,
          preferredMode,
        }),
        message,
        composer: input.composer,
        submitInput: input.submitInput,
        sendFollowUp,
        queueMessage: feedbackQueue.queueMessage,
        enqueueRun: input.enqueueRun,
        setQueueNotice: feedbackQueue.setQueueNotice,
        setIsSubmitting,
      });
    },
    [feedbackQueue, hasOpenSession, input, sendFollowUp],
  );

  return {
    visible: hasOpenSession,
    pendingQuestion: input.pendingInput?.question ?? null,
    pendingPartialOutput:
      input.pendingInput !== null &&
      input.pendingInput.partialOutput.trim().length > 0
        ? input.pendingInput.partialOutput
        : null,
    queuedCount: feedbackQueue.queuedCount,
    queueNotice: feedbackQueue.queueNotice,
    isSubmitting,
    submitFeedback,
  };
};
