"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";

import { SEND_TASK_CONTINUE_SESSION_QUERY_PARAM } from "@/features/agent/constants/sendTaskModalQuery.constant";
import { resolveIsWriterSessionContinuation } from "@/features/agent/utils/resolveIsWriterSessionContinuation";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

type SendClaudePrompt = (
  prompt: string,
  options?: {
    readonly writerAgent: HarnessWriterAgent;
    readonly targetUserId?: string;
    readonly groupId?: string;
    readonly capabilityId?: string;
    readonly targetDeviceId?: string;
  },
) => void;

type StartWriterSession = (
  writerAgent: HarnessWriterAgent,
  targetDeviceId?: string,
) => void;

export const useWriterSessionPromptContinuation = (input: {
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly threadAlreadyStarted: boolean;
  readonly finishSessionBase: () => void;
}): {
  readonly isSessionContinuation: () => boolean;
  readonly bindSendClaudePrompt: (
    dispatch: SendClaudePrompt,
  ) => SendClaudePrompt;
  readonly bindStartWriterSession: (
    startBase: StartWriterSession,
  ) => StartWriterSession;
  readonly finishLiveTerminalSession: () => void;
} => {
  const searchParams = useSearchParams();
  const continueFromQuery =
    searchParams.get(SEND_TASK_CONTINUE_SESSION_QUERY_PARAM) === "1";
  const hasSentUserPromptInWriterSessionRef = useRef(false);

  return {
    isSessionContinuation: () =>
      resolveIsWriterSessionContinuation({
        continueFromQuery,
        sessionWriterAgent: input.sessionWriterAgent,
        hasSentUserPrompt: hasSentUserPromptInWriterSessionRef.current,
        threadAlreadyStarted: input.threadAlreadyStarted,
      }),
    bindSendClaudePrompt: (dispatch) => (prompt, options) => {
      dispatch(prompt, options);
      if (input.sessionWriterAgent !== null || options !== undefined) {
        hasSentUserPromptInWriterSessionRef.current = true;
      }
    },
    bindStartWriterSession: (startBase) => (writerAgent, targetDeviceId) => {
      if (!continueFromQuery && !input.threadAlreadyStarted) {
        hasSentUserPromptInWriterSessionRef.current = false;
      }
      startBase(writerAgent, targetDeviceId);
    },
    finishLiveTerminalSession: () => {
      hasSentUserPromptInWriterSessionRef.current = false;
      input.finishSessionBase();
    },
  };
};
