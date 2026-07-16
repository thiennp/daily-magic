"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

export const useAgentLiveTerminalFeedbackQueue = (input: {
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly sendFollowUp: (message: string) => void;
}): {
  readonly queuedCount: number;
  readonly queueNotice: string | null;
  readonly queueMessage: (message: string) => void;
  readonly setQueueNotice: (message: string | null) => void;
} => {
  const [queuedMessages, setQueuedMessages] = useState<readonly string[]>([]);
  const [queueNotice, setQueueNotice] = useState<string | null>(null);
  const wasWorkingRef = useRef(false);
  const { status, pendingInput, sendFollowUp } = input;

  const flushQueuedMessages = useCallback(() => {
    if (queuedMessages.length === 0) {
      return;
    }

    const messages = [...queuedMessages];
    setQueuedMessages([]);
    messages.forEach((message) => {
      sendFollowUp(message);
    });
    setQueueNotice(
      messages.length === 1
        ? "Sent 1 queued follow-up."
        : `Sent ${messages.length} queued follow-ups.`,
    );
  }, [queuedMessages, sendFollowUp]);

  useEffect(() => {
    const isWorking = isAgentLiveTerminalWorking(status);

    if (wasWorkingRef.current && !isWorking && pendingInput === null) {
      flushQueuedMessages();
    }

    wasWorkingRef.current = isWorking;
  }, [flushQueuedMessages, pendingInput, status]);

  const queueMessage = useCallback((message: string) => {
    setQueuedMessages((current) => [...current, message.trim()]);
    setQueueNotice("Queued — will send when your Mac agent is ready.");
  }, []);

  return {
    queuedCount: queuedMessages.length,
    queueNotice,
    queueMessage,
    setQueueNotice,
  };
};
